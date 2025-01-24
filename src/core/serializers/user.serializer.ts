/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProfileModel } from "../entities/models/user.model";

export const serializedProfileResponse = (data: any): ProfileModel => {
    return {
        email: data.email,
        username: data.username,
        lastName: data.last_name,
        firstName: data.first_name,
        city: data.city,
        country: data.country,
        address: data.address,
        currency: data.currency
    }
}