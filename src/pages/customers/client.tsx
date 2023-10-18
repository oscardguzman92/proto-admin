import { GetServerSideProps, NextPage } from 'next'
import { Card } from 'react-bootstrap'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CustomerList } from '@components/Customers'
import { AdminLayout } from '@layout'
import { Customer } from '@models/customer'
import { newResource, Resource } from '@models/resource'
import { transformResponseWrapper, useSWRAxios } from '@hooks'
import { Pagination } from '@components/Pagination'

type Props = {
  page: number;
  perPage: number;
  sort: string;
  order: string;
}


const Client: NextPage<Props> = (props) => {
  const {
    page: initPage, perPage: initPerPage, sort: initSort, order: initOrder,
  } = props

  const [page, setPage] = useState(initPage)
  const [perPage, setPerPage] = useState(initPerPage)
  const [sort, setSort] = useState(initSort)
  const [order, setOrder] = useState(initOrder)

  const customerListURL = `${process.env.NEXT_PUBLIC_LIST_API_BASE_URL}customers` || ''
console.log(customerListURL);
  const [fallbackResource, setFallbackResource] = useState<Resource<Customer>>(
    newResource([], 0, page, perPage),
  )
    
  // swr: data -> axios: data -> resource: data
  const { data: { data: resource } } = useSWRAxios<Resource<Customer>>({
    url: customerListURL,
    params: {
      _page: page,
      _limit: perPage,
      _sort: sort,
      _order: order,
    },
    transformResponse: transformResponseWrapper((d: Customer [], h) => {
      const total = h ? parseInt(h['x-total-count'], 10) : 0
      return newResource(d, total, page, perPage)
    }),
  }, {
    data: fallbackResource,
    headers: {
      'x-total-count': '0',
    },
  })

  useEffect(() => {
    setFallbackResource(resource)
  }, [resource])

  return (
    <AdminLayout>
      <Card>
        <Card.Header>Customers (Storekeepers)</Card.Header>
        <Card.Body>
          <Pagination
            meta={resource.meta}
            setPerPage={setPerPage}
            setPage={setPage}
          />  
            <CustomerList
              customers={resource.data}
              setSort={setSort}
              setOrder={setOrder}
            />      
        </Card.Body>
      </Card>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  let page = 1
  if (context.query?.page && typeof context.query.page === 'string') {
    page = parseInt(context.query.page, 10)
  }

  let perPage = 20
  if (context.query?.per_page && typeof context.query.per_page === 'string') {
    perPage = parseInt(context.query.per_page.toString(), 10)
  }

  let sort = 'id'
  if (context.query?.sort && typeof context.query.sort === 'string') {
    sort = context.query.sort
  }

  let order = 'asc'
  if (context.query?.order && typeof context.query.order === 'string') {
    order = context.query.order
  }

  return {
    props: {
      page,
      perPage,
      sort,
      order,
    }, // will be passed to the page component as props
  }
}

export default Client;


