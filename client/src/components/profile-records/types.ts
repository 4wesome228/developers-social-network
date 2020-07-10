interface IRecord {
  placeholder: string;
  name: string;
  onRecordChange: (any) => void;
  value: string;
}

export interface ProfileRecordProps extends IRecord {
  tag?: string;
  description?: string;
}

export interface ProfileSocialRecordProps extends IRecord {}

export interface StatusRecordProps {
  value: string;
  onChange: (any) => void;
}
