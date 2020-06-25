import { connect, ConnectedProps } from "react-redux";
import { createProfile } from "../../store/actions/profile";

interface IField {
  name: string;
  placeholder: string;
  description?: string;
}

export interface IProfileField extends IField {
  tag?: string;
}

export interface IProfileSocialField extends IField {}

export interface IAdditionalProfileField {
  name: string;
  placeholder?: string;
  type: string;
  tag?: string;
  label?: string;
  required?: boolean;
}

export enum FIELDS_TYPES {
  fields = 1,
  socials = 2,
}

const mapDispatchToProps = {
  createProfile,
};

export const connector = connect(null, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;
