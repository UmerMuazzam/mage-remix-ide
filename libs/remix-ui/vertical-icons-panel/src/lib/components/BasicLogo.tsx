import React from 'react'
interface BasicLogoProps {
  classList?: string
  solid?: boolean
}

function BasicLogo({ classList = '', solid = true }: BasicLogoProps) {
  if (solid) {
    return (
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
  } else {
    return <img className="" src="assets/img/remix_logo_light.webp" style={{ height: '3rem' }} alt=""></img>
  }
}

export default BasicLogo
