import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createModal, updateModalData, updateModalStatus, addAction, deleteModal, deleteAction, clearActions } from '../store/slices/modal.slice';

const useModal = (key = null) => {

  const modals = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  useEffect(() => {
    if(key && !modals[key]){
      dispatch(createModal({
        key
      }))
    }
    
    return () => {
      if(modals[key]) {
        dispatch(deleteModal({
          key
        }));
      }
    }
  }, [key]);

  const updateData = (data) => {
    dispatch(updateModalData({
      key,
      value: data
    }))
  }

  const addModalAction = (actionName, actionHandler) => {
    dispatch(addAction({
      key,
      actionName,
      actionHandler
    }))
  }

  const removeModalAction = (actionName) => {
    dispatch(deleteAction({
      key,
      actionName
    }))
  }

  const removeActions = () => {
    dispatch(clearActions({
      key
    }))
  }

  const activateModal = (isActive) => {
    dispatch(updateModalStatus({
      key,
      isActive
    }))
  }

  return {
    modal: modals[key] || {},
    updateData,
    addModalAction,
    activateModal,
    removeModalAction,
    removeActions
  }
}

export default useModal