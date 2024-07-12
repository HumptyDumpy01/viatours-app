// import { storePost } from '@/lib/posts';
// import { redirect } from 'next/navigation';
import CTAForm from '@/components/homepage/cta-2/CTAForm';

// creating a for validation helper.
function isEmpty(variable: string) {
  return !variable || variable.trim() === ``;
}

export default function CTA2FirstCol() {

  /* INFO: After implementing server action correctly
      consider moving it to actions/posts(e.g.) folder and file.
      export it onto this component, thus making it a a lot more leaner. */

  // IMPORTANT: Define the errors array to store the error messages,
  //  define correct types for prevState and formData.
  // @ts-ignore
  async function createPost(prevState, formData) {
    'use server';

    /*let errors = [];*/

    // access the props you defined in form inputs

    // const title = formData.get(`title`);

    // validate each input, and if it is invalid, push the correspondent text message
    /* if (isEmpty(title)) {
      errors.push(`The title should not be empty!`);
    } */

    // if the errors array is not empty, then just return this object.

    /*if (errors.length > 0) {
      return {
        errors
      };
    }*/

    /*
    let imageUrl;
    try {
      // uploadImage is a function connected to Cloudinary. Use cloudinaryInit snippet
      // to instruct you how to upload user images.
      imageUrl = await uploadImage(image);
    } catch (e) {
      throw new Error(`Failed to upload the image! Post cannot be created right now. Please, try again later.`);
    }  */

    // here you should use the API endpoint, related to the logic you want to perform.
    /*
    await storePost({
      imageUrl: ``,
      title,
      content,
      userId: 1
    }); */

    // redirect the user to somewhere, when it is needed.
    // redirect(`/feed`);
  }

  return (
    <>
      {/* Inject your form and pass the server action */}
      <CTAForm action={createPost} />
    </>
  );
}
