import { RemixApp } from '@remix-ui/app'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import * as packageJson from '../../../../../package.json'
import { fileSystem, fileSystems } from '../files/fileSystem'
import { indexedDBFileSystem } from '../files/filesystems/indexedDB'
import { localStorageFS } from '../files/filesystems/localStorage'
import { fileSystemUtility, migrationTestData } from '../files/filesystems/fileSystemUtility'
import './styles/preload.css'
import isElectron from 'is-electron'
const _paq = (window._paq = window._paq || [])

export const Preload = (props: any) => {
  const [tip, setTip] = useState<string>('')
  const [supported, setSupported] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [showDownloader, setShowDownloader] = useState<boolean>(false)
  const remixFileSystems = useRef<fileSystems>(new fileSystems())
  const remixIndexedDB = useRef<fileSystem>(new indexedDBFileSystem())
  const localStorageFileSystem = useRef<fileSystem>(new localStorageFS())
  // url parameters to e2e test the fallbacks and error warnings
  const testmigrationFallback = useRef<boolean>(
    window.location.hash.includes('e2e_testmigration_fallback=true') && window.location.host === '127.0.0.1:8080' && window.location.protocol === 'http:'
  )
  const testmigrationResult = useRef<boolean>(
    window.location.hash.includes('e2e_testmigration=true') && window.location.host === '127.0.0.1:8080' && window.location.protocol === 'http:'
  )
  const testBlockStorage = useRef<boolean>(
    window.location.hash.includes('e2e_testblock_storage=true') && window.location.host === '127.0.0.1:8080' && window.location.protocol === 'http:'
  )

  function loadAppComponent() {
    import('../../app')
      .then((AppComponent) => {
        const appComponent = new AppComponent.default()
        appComponent.run().then(() => {
          props.root.render(<RemixApp app={appComponent} />)
        })
      })
      .catch((err) => {
        _paq.push(['trackEvent', 'Preload', 'error', err && err.message])
        console.error('Error loading Remix:', err)
        setError(true)
      })
  }

  const downloadBackup = async () => {
    setShowDownloader(false)
    const fsUtility = new fileSystemUtility()
    await fsUtility.downloadBackup(remixFileSystems.current.fileSystems['localstorage'])
    await migrateAndLoad()
  }

  const migrateAndLoad = async () => {
    setShowDownloader(false)
    const fsUtility = new fileSystemUtility()
    const migrationResult = await fsUtility.migrate(localStorageFileSystem.current, remixIndexedDB.current)
    _paq.push(['trackEvent', 'Migrate', 'result', migrationResult ? 'success' : 'fail'])
    await setFileSystems()
  }

  const setFileSystems = async () => {
    const fsLoaded = await remixFileSystems.current.setFileSystem([
      testmigrationFallback.current || testBlockStorage.current ? null : remixIndexedDB.current,
      testBlockStorage.current ? null : localStorageFileSystem.current
    ])
    if (fsLoaded) {
      console.log(fsLoaded.name + ' activated')
      _paq.push(['trackEvent', 'Storage', 'activate', fsLoaded.name])
      loadAppComponent()
    } else {
      _paq.push(['trackEvent', 'Storage', 'error', 'no supported storage'])
      setSupported(false)
    }
  }

  const testmigration = async () => {
    if (testmigrationResult.current) {
      const fsUtility = new fileSystemUtility()
      fsUtility.populateWorkspace(migrationTestData, remixFileSystems.current.fileSystems['localstorage'].fs)
    }
  }

  useEffect (() => {
    if (isElectron()){
      loadAppComponent()
      return
    }
    async function loadStorage() {
      ;(await remixFileSystems.current.addFileSystem(remixIndexedDB.current)) || _paq.push(['trackEvent', 'Storage', 'error', 'indexedDB not supported'])
      ;(await remixFileSystems.current.addFileSystem(localStorageFileSystem.current)) || _paq.push(['trackEvent', 'Storage', 'error', 'localstorage not supported'])
      await testmigration()
      remixIndexedDB.current.loaded && (await remixIndexedDB.current.checkWorkspaces())
      localStorageFileSystem.current.loaded && (await localStorageFileSystem.current.checkWorkspaces())
      remixIndexedDB.current.loaded && (remixIndexedDB.current.hasWorkSpaces || !localStorageFileSystem.current.hasWorkSpaces ? await setFileSystems() : setShowDownloader(true))
      !remixIndexedDB.current.loaded && (await setFileSystems())
    }
    loadStorage()

    const abortController = new AbortController()
    const signal = abortController.signal
    async function showRemixTips() {
      const response = await axios.get('https://raw.githubusercontent.com/remix-project-org/remix-dynamics/main/ide/tips.json', { signal })
      if (signal.aborted) return
      const tips = response.data
      const index = Math.floor(Math.random() * (tips.length - 1))
      setTip(tips[index])
    }
    try {
      showRemixTips()
    } catch (e) {
      console.log(e)
    }
    return () => {
      abortController.abort();
    };
  }, [])

  return (
    <>
      <div className="preload-container">
        <div className="preload-logo pb-4">
          <div style={{ textAlign:'center' }}>{logo}</div>
          <div className="info-secondary splash">
            CreataChain
            <br />
            <span className="version"> v{packageJson.version}</span>
          </div>
        </div>
        {!supported ? <div className="preload-info-container alert alert-warning">Your browser does not support any of the filesystems required by Remix. Either change the settings in your browser or use a supported browser.</div> : null}
        {error ? (
          <div className="preload-info-container alert alert-danger text-left">
            An unknown error has occurred while loading the application.
            <br></br>
            Doing a hard refresh might fix this issue:<br></br>
            <div className="pt-2">
              Windows:<br></br>- Chrome: CTRL + F5 or CTRL + Reload Button
              <br></br>- Firefox: CTRL + SHIFT + R or CTRL + F5<br></br>
            </div>
            <div className="pt-2">
              MacOS:<br></br>- Chrome & FireFox: CMD + SHIFT + R or SHIFT + Reload Button<br></br>
            </div>
            <div className="pt-2">
              Linux:<br></br>- Chrome & FireFox: CTRL + SHIFT + R<br></br>
            </div>
          </div>
        ) : null}
        {showDownloader ? (
          <div className="preload-info-container alert alert-info">
            This app will be updated now. Please download a backup of your files now to make sure you don't lose your work.
            <br></br>
            You don't need to do anything else, your files will be available when the app loads.
            <div
              onClick={async () => {
                await downloadBackup()
              }}
              data-id="downloadbackup-btn"
              className="btn btn-primary mt-1"
            >
              download backup
            </div>
            <div
              onClick={async () => {
                await migrateAndLoad()
              }}
              data-id="skipbackup-btn"
              className="btn btn-primary mt-1"
            >
              skip backup
            </div>
          </div>
        ) : null}
        {supported && !error && !showDownloader ? (
          <div>
            <div className="text-center">
              <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
            {tip && (
              <div className="remix_tips text-center mt-3">
                <div>
                  <b>DID YOU KNOW</b>
                </div>
                <span>{tip}</span>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  )
}

const logo = (
  <svg xmlns="http://www.w3.org/2000/svg" width="39.218" height="45.514" viewBox="0 0 39.218 45.514">
    <g id="Group_28010" data-name="Group 28010" transform="translate(-426.294 -11789.999)">
      <g id="Group_28009" data-name="Group 28009" transform="translate(7380 5955)">
        <g id="Group_27358" data-name="Group 27358" transform="translate(-6962.546 5832.543)">
          <g id="Group_15974" data-name="Group 15974" transform="translate(8.84 2.456)">
            <g id="Group_15971" data-name="Group 15971" transform="translate(0 27.07)">
              <path id="Path_846" data-name="Path 846" d="M212.849,334.091l-.286.186-12.931.706-12.492,5.6c1.977-1.1,4.572-2.5,6.847-3.721,2.858-1.528,5.215-2.769,5.215-2.769Z" transform="translate(-186.418 -334.091)" fill="#013eb7" />
              <path id="Path_847" data-name="Path 847" d="M210.634,334.774l-1.963,1.26-4.553,2.925-4.394,2.825-1.918,1.234,6.311,9.931v.037l-18.54-10.7-1.089-.628v-.171l.721-.405,12.492-5.6Z" transform="translate(-184.489 -334.588)" fill="#013eb7" />
            </g>
            <g id="Group_15970" data-name="Group 15970" transform="translate(12.247)">
              <path id="Path_849" data-name="Path 849" d="M256.448,275.927l-.019.026-7.267,4.724-4.68,3.04H229.5l.346-.212,14.373-.859,12.21-6.731Z" transform="translate(-229.497 -264.676)" fill="#013eb7" />
              <path id="Path_850" data-name="Path 850" d="M257.351,245.85l-12.21,6.731-14.373.859,2.553-1.565,4.483-2.751,4.955-3.037,1.847-1.134-6.776-10.314.052-.03,18.358,10.6Z" transform="translate(-230.422 -234.61)" fill="#013eb7" />
              <path id="Path_851" data-name="Path 851" d="M263.426,245.034l-1.847,1.134L256.7,243.35l-.078.045v-8.66l.026-.015Z" transform="translate(-249.243 -234.689)" fill="#013eb7" />
            </g>
            <g id="Group_15972" data-name="Group 15972" transform="translate(0 0.045)">
              <path id="Path_845" data-name="Path 845" d="M204.118,234.774v8.66l-12.128,7v10.27l-7.5,7.731V246.107Z" transform="translate(-184.489 -234.774)" fill="#013eb7" />
              <path id="Path_852" data-name="Path 852" d="M192.057,333.937c-2.275,1.219-4.869,2.617-6.847,3.721l-.721.405v-.256l7.5-7.731V333.9Z" transform="translate(-184.489 -304.142)" fill="#013eb7" />
            </g>
            <path id="Path_853" data-name="Path 853" d="M276.413,276.1v22.758L256.7,310.239l-.041-.022-.037-.059V301.53l.078.045,12.206-7.047V285.9l7.267-9.9.03-.019Z" transform="translate(-237.196 -264.726)" fill="#013eb7" />
          </g>
        </g>
      </g>
    </g>
  </svg>
)
