import { FormEvent, useRef } from "react";


const FormFilter = () => {

    const searchFilterRef: React.MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);


    function submitHandler(event: FormEvent<HTMLFormElement>) : void{
        event.preventDefault();
        // if(searchFilterRef.current!=null) console.log(searchFilterRef.current.value);
    }

  return (
    <div className='mr-8 w-6/12 ml-8 px-2 flex'>
        <div className='flex items-center w-1/4'>
        Search By:
        </div>
            <form className='-ml-4 flex items-end w-full' onSubmit={submitHandler}>
                <input type='text' placeholder='Search by Job Title, Job Id or Candidate First Name' className='p-2 rounded-lg border border-indigo-700 w-11/12' ref={searchFilterRef} />
            </form>
    </div>
  )
}

export default FormFilter