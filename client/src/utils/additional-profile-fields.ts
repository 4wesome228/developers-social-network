const data = {
  experience: {
    title: {
      name: "title",
      type: "text",
      placeholder: "* Job Title",
      required: true,
    },
    company: {
      name: "company",
      type: "text",
      placeholder: "* Company",
      required: true,
    },
    location: {
      name: "location",
      type: "text",
      placeholder: "Location",
      required: false,
    },
    from: {
      name: "from",
      type: "date",
      label: "From Date",
    },
    current: {
      name: "current",
      type: "checkbox",
      label: "Current Job",
    },
    to: {
      name: "to",
      type: "date",
      label: "To Date",
    },
    description: {
      name: "description",
      type: "textearea",
      placeholder: "Job Description",
      tag: "textarea",
    },
  },
  education: {
    school: {
      name: "school",
      type: "text",
      placeholder: "* School or Bootcamp",
      required: true,
    },
    degree: {
      name: "degree",
      type: "text",
      placeholder: "* Degree or Certificate",
      required: true,
    },
    fieldofstudy: {
      name: "fieldofstudy",
      type: "text",
      placeholder: "* Location",
      required: false,
    },
    from: {
      name: "from",
      type: "date",
      label: "* From Date",
    },
    current: {
      name: "current",
      type: "checkbox",
      label: "Current School or Bootcamp",
    },
    to: {
      name: "to",
      type: "date",
      label: "To Date",
    },
    description: {
      name: "description",
      type: "textarea",
      placeholder: "Program Description",
      tag: "textarea",
    },
  },
};

export default data;

export type AdditionalProfileFormData = {
  to: string;
  from: string;
  current: boolean;
  description: string;
  school?: string;
  degree?: string;
  fieldofstudy?: string;
  title?: string;
  company?: string;
  locaiton?: string;
};

export const createAdditionalProfileData = (name: string) => {
  return Object.keys({
    ...data[name],
  }).reduce((prop, next) => {
    next === "current" ? (prop[next] = false) : (prop[next] = "");
    return prop;
  }, {} as AdditionalProfileFormData);
};
