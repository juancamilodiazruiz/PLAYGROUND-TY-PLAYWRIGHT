import {test, expect} from "@playwright/test"
import { BookingApi, type Booking } from "../../src/api/BookingApi";


test('Booking API test complete',  async ({request}) => {
    const api = new BookingApi(request);

    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;

    if(!username || !password) {
        throw new Error('Missing API credentials');
    }

    const authResponse = await api.autenthicate(username, password);
    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    const token = await authBody.token;
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);

    const bookingData: Booking = {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-10-19',
            checkout: '2026-10-24'
        },
        additionalneeds: 'Breakfast'
    };

    let bookingId: number | undefined;
    let deleted = false;

    try {
    const createResponse = await api.create(bookingData);
    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    expect(createBody.bookingid).toEqual(
      expect.any(Number)
    );

    bookingId = createBody.bookingid;

    expect(bookingId).toBeGreaterThan(0);
    expect(createBody.booking).toEqual(
      expect.objectContaining({
        ...bookingData,
      })
    );


    const getResponse = await api.getById(bookingId!);
    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();
    expect(getBody).toEqual(
      expect.objectContaining({
        ...bookingData,
      })
    );

    const updatedBooking: Booking = {
      ...bookingData,
      bookingdates: {
        ...bookingData.bookingdates,
        checkout: '2027-01-20',
      },
    };

    const updateResponse = await api.update(
      bookingId!,
      updatedBooking,
      token
    );

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();

    expect(updateBody.bookingdates.checkout)
      .toBe('2027-01-20');

    expect(updateBody).toEqual(
      expect.objectContaining({
        ...updatedBooking,
      })
    );

    const verifyResponse = await api.getById(bookingId!);

    expect(verifyResponse.status()).toBe(200);

    const verifyBody = await verifyResponse.json();

    expect(verifyBody).toEqual(
      expect.objectContaining({
        ...updatedBooking,
      })
    );

    const deleteResponse = await api.delete(
      bookingId!,
      token
    );

    expect(deleteResponse.status()).toBe(201);

    deleted = true;

    const finalResponse = await api.getById(bookingId!);

    expect(finalResponse.status()).toBe(404);

  } finally {

    if (bookingId !== undefined && !deleted) {
      try {
        const cleanupResponse = await api.delete(
          bookingId,
          token
        );

        if (![201, 404].includes(cleanupResponse.status())) {
          console.error(
            `Cleanup failed: ${cleanupResponse.status()}`
          );
        }
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    }
  }
});