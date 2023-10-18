import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope, IconDefinition } from '@fortawesome/free-regular-svg-icons'
import {
  faBasketShopping,
  faChartBar,
  faGaugeHigh,
  faList,
  faUserMinus,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import {
  Badge, Dropdown, Nav, NavLink, ProgressBar,
} from 'react-bootstrap'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import Image from 'next/image'

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren

const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  )
}

export default function HeaderNotificationNav() {
  return (
    <Nav>      
      <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle as={NavLink} bsPrefix="hide-caret" id="dropdown-task">
            <FontAwesomeIcon icon={faList} size="lg" />
            <Badge pill bg="warning" className="position-absolute top-0 right-0">
              x
            </Badge>
          </Dropdown.Toggle>
          <Dropdown.Menu className="pt-0" align="end">
            <Dropdown.Header className="bg-light fw-bold rounded-top">Hay 5 procesos pendientes</Dropdown.Header>

            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Nuevos vendedores</div>
                  <div className="ms-auto">0%</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="primary"
                  now={0}
                />
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Pedidos pendientes</div>
                  <div className="ms-auto">25%</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="danger"
                  now={25}
                />
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Carga cron</div>
                  <div className="ms-auto">50%</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="warning"
                  now={50}
                />
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Carga de productos</div>
                  <div className="ms-auto">80%</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="primary"
                  now={80}
                />
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />

            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item className="text-center fw-bold">View all tasks</Dropdown.Item>
            </Link>

          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>    
    </Nav>
  )
}
