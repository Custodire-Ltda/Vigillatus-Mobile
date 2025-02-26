export default function formatLastName(lastName) {
    const lastNameParts = lastName.split(" ");
    if (lastNameParts.length > 3) {
      return `${lastNameParts[0]} ${lastNameParts.slice(1).map(name => name[0] + '.').join(' ')}`;
    }
    return lastName;
  };

