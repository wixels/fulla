/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    listings: Listing;
    categories: Category;
    types: Type;
    offerings: Offering;
    amenities: Amenity;
    media: Media;
  };
  globals: {};
}
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string | Category;
  offerings: string[] | Offering[];
  author: string | User;
  amenities: string[] | Amenity[];
  type: string | Type;
  province: string;
  street: string;
  unitNumber: string;
  suburb: string;
  city: string;
  postalCode: string;
  /**
   * @minItems 2
   * @maxItems 2
   */
  location?: [number, number];
  featureImage?: string | Media;
  images: {
    image: string | Media;
    id?: string;
  }[];
  roomCount: number;
  bedCount: number;
  bathroomCount: number;
  guestCount: number;
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Category {
  id: string;
  label: string;
  updatedAt: string;
  createdAt: string;
}
export interface Offering {
  id: string;
  label: string;
  updatedAt: string;
  createdAt: string;
}
export interface Amenity {
  id: string;
  label: string;
  updatedAt: string;
  createdAt: string;
}
export interface Type {
  id: string;
  label: string;
  description: string;
  icon: string;
  updatedAt: string;
  createdAt: string;
}
export interface Media {
  id: string;
  alt?: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    card?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    tablet?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
}
