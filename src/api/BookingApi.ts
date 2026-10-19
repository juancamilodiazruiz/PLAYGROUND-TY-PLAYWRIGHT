import type {
    APIRequestContext,
    APIResponse,
} from '@playwright/test'

export interface Booking {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: {
        checkin: string;
        checkout: string;
    };
    additionalneeds: string;
}

export class BookingApi {
    constructor(
        private  request: APIRequestContext
    ){};

    async autenthicate(username:string, password:string): Promise<APIResponse>{
        return this.request.post('/auth', 
            {
                data:{username, password}
            }
        );
    };


    async create(booking: Booking): Promise<APIResponse> {
        return this.request.post('/booking', {
            data: booking
        });
    }

    async getById(bookingId: number): Promise<APIResponse> {
        return this.request.get(`/booking/${bookingId}`);
    }

    async update(bookingId: number, booking: Booking, token: string): Promise<APIResponse> {
        return this.request.put(`/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`
            },
            data: booking
        });
    }

    async delete(bookingId: number, token: string): Promise<APIResponse> {
        return this.request.delete(`/booking/${bookingId}`, {
            headers: {
                Cookie: `token=${token}`
            }
        });
    }
}