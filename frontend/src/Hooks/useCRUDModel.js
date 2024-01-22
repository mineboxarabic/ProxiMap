
import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
const useCRUDModel = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const AddModel = async (modelName, model) => {
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
      .finally(() => {
        setLoading(false);
      });

        return response;
  };

  const EditModel = async (modelName, id, model) => {
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
      .finally(() => {
        setLoading(false);
      });
      return response;
  };

  const DeleteModel = async (modelName, id) => {
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
      .finally(() => {
        setLoading(false);
      });
      return response;
  };

  const GetAllModels = async (modelName) => {
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
      .finally(() => {
        setLoading(false);
      });

        return response;
      
  };

  const GetOneModel = async (modelName, id) => {
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
