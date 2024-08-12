import { FormDataType } from '@/components/account-settings/contents/user-profile/UserProfile';

export function validateFormData(results: FormDataType, validateAs: `passwordRequired` | `confirmPassIsNotRequired`): string[] {
  const errors: string[] = [];

  if (validateAs === `passwordRequired` && results.password) {
    if (!results.email.includes('@') || results.firstName.trim() === `` ||
      results.lastName.trim() === `` || results.password.trim() === ``) {
      errors.push('Please fill in all the required fields *');
    }

    if (!results.email.includes('@')) {
      errors.push('Please enter a valid email address.');
    }

    if (results.firstName.trim() === ``) {
      errors.push('Please enter your first name.');
    }
    if (results.lastName.trim() === ``) {
      errors.push('Please enter your last name.');
    }

    if (results.password.length < 8 || results.password.length > 100) {
      errors.push('Password should be at least 8 to 100 chars long.');
    }

  } else {

    if (!results.email.includes('@') || results.firstName.trim() === `` ||
      results.lastName.trim() === ``) {
      errors.push('Please fill in all the required fields *');
    }

    if (!results.email.includes('@')) {
      errors.push('Please enter a valid email address.');
    }
    if (results.firstName.trim() === ``) {
      errors.push('Please enter your first name.');
    }
    if (results.lastName.trim() === ``) {
      errors.push('Please enter your last name.');
    }

  }

  return errors;
}
