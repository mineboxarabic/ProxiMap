
import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
const useCRUDModel = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const AddModel = async (modelName: any, model: any) => {
    setLoading(true);
    const response = await axiosPrivate
      .post("/" + modelName, model)
      .then((response) => {
        setLoading(false);
        setSuccess(true);
        setError('');
        return true;
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.error[0].msg);
        return error.response.data.error[0].msg;
      })
      // @ts-expect-error TS(2550): Property 'finally' does not exist on type 'Promise... Remove this comment to see the full error message
      .finally(() => {
        setLoading(false);
      });

        return response;
  };

  const EditModel = async (modelName: any, id: any, model: any) => {
    setLoading(true);
    const response = await axiosPrivate
      .put("/" + modelName + "/" + id, model)
      .then((response) => {
        setLoading(false);
        setSuccess(true);
        setError('');
        return response.data;
      })
      .catch((error) => {
        setLoading(false);
        //If status is 500
        if (error.response.status === 500) {
          setError("Something went wrong");
          return "Something went wrong";
        }
        setError(error.response.data.error[0].msg);
        return error.response.data.error[0].msg;
      })
      // @ts-expect-error TS(2550): Property 'finally' does not exist on type 'Promise... Remove this comment to see the full error message
      .finally(() => {
        setLoading(false);
      });
      return response;
  };

  const DeleteModel = async (modelName: any, id: any) => {
    setLoading(true);

    const response = await axiosPrivate
      .delete(`/${modelName}/${id}`)
      .then((response) => {
        setLoading(false);
        setSuccess(true);
        setError('');
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.error[0].msg);
        return error.response.data.error[0].msg;
      })
      // @ts-expect-error TS(2550): Property 'finally' does not exist on type 'Promise... Remove this comment to see the full error message
      .finally(() => {
        setLoading(false);
      });
      return response;
  };

  const GetAllModels = async (modelName: any) => {
    setLoading(true);

   const response = await axiosPrivate
      .get(`/${modelName}`)
      .then((response) => {
        setLoading(false);
        setSuccess(true);
        setError('');
        return response.data;
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.error[0].msg);
        return error.response.data.error[0].msg;
      })
      // @ts-expect-error TS(2550): Property 'finally' does not exist on type 'Promise... Remove this comment to see the full error message
      .finally(() => {
        setLoading(false);
      });

        return response;
      
  };

  const GetOneModel = async (modelName: any, id: any) => {
    setLoading(true);

    const response = await axiosPrivate
      .get(`/${modelName}/${id}`)
      .then((response) => {
        setLoading(false);
        setSuccess(true);
        setError('');
        //remove the last letter from the modelName
        //modalname = services
        //we want to remove the s

        const modelName_ = modelName.slice(0, -1);
        return response.data[modelName_];
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.error[0].msg);
        return error.response.data.error[0].msg;
      })
      // @ts-expect-error TS(2550): Property 'finally' does not exist on type 'Promise... Remove this comment to see the full error message
      .finally(() => {
        setLoading(false);
      });
          
            return response;
  };
  return {
    AddModel,
    EditModel,
    DeleteModel,
    GetAllModels,
    GetOneModel,
    loading,
    error,
    success,
    setSuccess,
    setError
  };
};

export default useCRUDModel;
