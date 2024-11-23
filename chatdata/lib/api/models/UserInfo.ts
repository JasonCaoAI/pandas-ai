/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrganizationBase } from './OrganizationBase';
import type { SpaceBase } from './SpaceBase';
export type UserInfo = {
    email: string;
    first_name: string;
    id: string;
    organizations: Array<OrganizationBase>;
    space: SpaceBase;
    features?: Record<string, any>;
};

