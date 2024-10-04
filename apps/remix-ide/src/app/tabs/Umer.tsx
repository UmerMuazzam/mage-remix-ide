import {ViewPlugin} from '@remixproject/engine-web'
import * as packageJson from '../../../../../package.json'
import React, {useState} from 'react' // eslint-disable-line
import { Accordion, Button, Card } from 'react-bootstrap'
import ContractLookup from '../components/ContractLookup'

const profile = {
  name: 'imUmer',
  displayName: 'Hello from me Umer',
  methods: [''],
  events: [],
  icon: 'assets/img/brave.png',
  description: 'Find and replace in file explorer',
  kind: '',
  location: 'sidePanel',
  documentation: 'google.com',
  version: packageJson.version,
  maintainedBy: 'Remix',
}

export class UmerPlugin extends ViewPlugin {
  constructor() {
    super(profile)
  }

  render() {
    return <ContractLookup />
  }
}
