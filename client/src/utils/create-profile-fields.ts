export const createProfileFields = {
  fields: {
    company: {
      name: "company",
      placeholder: "Company",
      description: "Could be your own company or one you work for",
    },
    website: {
      name: "website",
      placeholder: "Website",
      description: "Could be your own or a company website",
    },
    location: {
      name: "location",
      placeholder: "Location",
      description: "City & state suggested (eg. Boston, MA)",
    },
    skills: {
      name: "skills",
      placeholder: "* Skills",
      description:
        "Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)",
    },
    bio: {
      name: "bio",
      placeholder: "A short bio of yourself",
      description: "Tell us a little about yourself",
      tag: "textarea",
    },
  },
  socials: {
    twitter: {
      name: "twitter",
      placeholder: "Link to social network",
    },
    youtube: {
      name: "youtube",
      placeholder: "Link to social network",
    },
    facebook: {
      name: "facebook",
      placeholder: "Link to social network",
    },
    linkedin: {
      name: "linkedin",
      placeholder: "Link to social network",
    },
    instagram: {
      name: "instagram",
      placeholder: "Link to social network",
    },
  },
};

export type ProfileDataType = {
  company: string;
  status: string;
  website: string;
  location: string;
  skills: string;
  twitter: string;
  youtube: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  bio?: string;
};

export const createProfileData = Object.keys({
  ...createProfileFields.socials,
  ...createProfileFields.fields,
}).reduce((prop, next: string) => {
  prop[next] = "";
  return prop;
}, {} as ProfileDataType);
