import { useState, useEffect, useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import useLoader from './useLoader';
import { toast } from 'react-toastify';
import commonNotifications from '../constant/notifications/common.notifications';

const DEFAULT_PAGINATION_LIMIT = 15;
const DEFAULT_PAGE_NUMBER = 1;
const ALLOWED_PAGE_LIMIT = [9,10,11,12,13,14,15];

const usePagination = ({
  loadHandler = () => {}
}) => {

  const { loader, updateLoader } = useLoader({
    loadingData: false  
  });

  const [paginatedData, setPaginatedData] = useState([]);
  const [pageLimit, setPageLimit] = useState(DEFAULT_PAGINATION_LIMIT);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [totalRecordCounts, setTotalRecordCounts] = useState(null);

  useEffect(() => {
    updateLoader("loadingData", true)
    loadHandler(pageLimit, pageNumber).then((res) => {
      if(!isEmpty(res) && res.statusCode === 200){
        setPaginatedData(res?.data);
        setTotalRecordCounts(res?.count);
      }
    }).catch((err) => {
      toast.error(err?.message || commonNotifications.common.somethingWentWrong)
    }).finally(() => {
      updateLoader("loadingData", false)
    });
  }, [paginatedData, pageLimit, pageNumber]);

  const availablePages = useMemo(() => {
    if(!totalRecordCounts){
      return null
    }
    
    return totalRecordCounts  / pageLimit;
  }, [totalRecordCounts, pageLimit]);

  const updatePageNumber = (pageNumber) => {
    setPageNumber(pageNumber)
  }

  const updatePageLimit = (pageLimit) => {
    if(ALLOWED_PAGE_LIMIT.includes(pageLimit)){
      setPageLimit(pageLimit);
    }
  }

  return {
    isLoading: loader.loadingData,
    paginatedData,
    availablePages,
    updatePageNumber,
    updatePageLimit,
    allowedLimits: ALLOWED_PAGE_LIMIT
  }
}

export default usePagination