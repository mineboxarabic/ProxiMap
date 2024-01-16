import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
const useCRUDModel = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);

  const AddModel = async (modelName, model) => {
    setLoading(true);
    const response = await axiosPrivate
      .post("/" + modelName, model)
      .then((response) => {
        setLoading(false);
        return true;
      })
      .catch((error) => {
        setLoading(false);
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
        return true;
      })
      .catch((error) => {
        setLoading(false);
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
        return true;
      })
      .catch((error) => {
        setLoading(false);
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
        return response.data;
      })
      .catch((error) => {
        setLoading(false);
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
        return response.data;
      })
      .catch((error) => {
        setLoading(false);
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

  };
};

export default useCRUDModel;
