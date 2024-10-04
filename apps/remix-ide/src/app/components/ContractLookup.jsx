import React from 'react'
import {Accordion, Button, Card} from 'react-bootstrap'
import arr from '../../assets/img/arrow1.svg'

const ContractLookup = () => {
  return (
    <div className="container">
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header className="p-0">
            <Accordion.Toggle className="d-flex justify-content-between w-100 text-decoration-none" as={Button} variant="link" eventKey="0">
              Contract Lookup <img style={{height: '24', width: '24px'}} src={arr} alt="Down arrow" />
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="p-2">
              <div className="my-4">
                <p className="fs-3">Input a verified contract's address to load its source code in the editor.</p>
              </div>

              <select className="form-select p-2  w-100 rounded" aria-label="Default select example">
                <option selected>Creata Chain Mainnet</option>
                <option value="1">Creata Chain Testnet</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>

              <div className="input-group flex-nowrap mt-2">
                <input type="text" className="form-control p-2" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
              </div>

              <button className='bg-primary w-100 outline-none border-none rounded text-white p-2 my-4'>Fetch</button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}

export default ContractLookup
