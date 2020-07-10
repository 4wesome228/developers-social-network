export const extractProfileFields = (profile) => {
  if (profile === null) return null;
  const { company, bio, status, skills, website, location, social } = profile;

  return {
    company: company,
    bio: bio,
    status: status,
    skills: skills.join(),
    website: website,
    location: location,
    social: social,
  };
};
