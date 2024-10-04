import { ViewPlugin } from '@remixproject/engine-web'
import * as packageJson from '../../../../../package.json'
import React, {useState} from 'react' // eslint-disable-line

const profile = {
  name: 'alpha',
  displayName: 'This is just for test',
  methods: [''],
  events: [],
  icon: 'assets/img/creata.svg',
  description: 'Find and replace in file explorer',
  location: 'mainPanel'
}

export class AlphaPlugin extends ViewPlugin {
  constructor() {
    super(profile)
  }

  handleCall=()=>{
    alert("hello from alpha plugin")
  }

  render() {
    return (
      <>
        <button onClick={this.handleCall}>this is alpha plugin</button>
      </>
    )
  }
}
