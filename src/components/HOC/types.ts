import { AdditionalProfileFormData } from "../../utils/additional-profile-fields";

export type AdditionalHOCInjectedProps = {
  isFetching: boolean;
  handleSumbit: (e: any) => void;
  handleChange: (e: any) => void;
  formData: AdditionalProfileFormData;
  renderCheckboxRecord: (label: string, name: string) => React.ReactNode;
  renderDateRecord: (
    label: string,
    name: string,
    handleChange: (e: any) => void
  ) => React.ReactNode;
  title: string;
  subtitle: string;
  iconClassName: string;
  keyword: "education" | "experience";
};
