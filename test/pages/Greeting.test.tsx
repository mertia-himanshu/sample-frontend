import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpConnection, HttpLocation, Prefix } from '@tmtsoftware/esw-ts'
import { expect } from 'chai'
import React from 'react'
import { anything, capture, deepEqual, verify, when } from 'ts-mockito'
import { AdminGreeting } from '../../src/components/pages/AdminGreeting'
import { Greeting } from '../../src/components/pages/Greeting'
import {
  locationServiceMock,
  mockFetch,
  renderWithRouter
} from '../utils/test-utils'

describe('Greeting', () => {
  const connection = HttpConnection(Prefix.fromString('ESW.sample'), 'Service')

  const httpLocation: HttpLocation = {
    _type: 'HttpLocation',
    uri: 'some-backend-url',
    connection,
    metadata: {}
  }
  when(locationServiceMock.find(deepEqual(connection))).thenResolve(
    httpLocation
  )

  it('should render Input form and display message on submit', async () => {
    const firstname = 'Test'
    const lastname = 'User'
    const userInfo = {
      firstname,
      lastname
    }
    const greeting = `Hello user: ${firstname} ${lastname}!!!`
    const response = new Response(JSON.stringify({ greeting }))
    const fetch = mockFetch()

    when(fetch(anything(), anything())).thenResolve(response)

    renderWithRouter(<Greeting />)

    const firstNameInput = (await screen.findByRole(
      'FirstName'
    )) as HTMLInputElement
    const lastNameInput = (await screen.findByRole(
      'LastName'
    )) as HTMLInputElement

    userEvent.type(firstNameInput, firstname)
    userEvent.type(lastNameInput, lastname)

    const submitButton = (await screen.findByRole(
      'Submit'
    )) as HTMLButtonElement

    await waitFor(() => userEvent.click(submitButton))

    verify(locationServiceMock.find(deepEqual(connection))).called()
    const [firstArg, secondArg] = capture(fetch).last()
    expect(firstArg).to.equal(httpLocation.uri + 'greeting')

    const expectedReq = {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: { 'Content-Type': 'application/json' }
    }

    expect(JSON.stringify(secondArg)).to.equal(JSON.stringify(expectedReq))

    await screen.findByText(greeting)
  })
})