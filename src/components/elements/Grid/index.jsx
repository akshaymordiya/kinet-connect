import React, { useMemo } from 'react';
import useWindowResize from '../../../hooks/useWindowResize';
import "./index.scss";

const defaultTempleteColumns = { 
  xsm: "col_1",
  sm: 'col_1',
  md: 'col_2',
  lg: "col_3", 
  xlg: "col_4"
}

const Grid = function Grid({ 
  children,
  templateColumns = defaultTempleteColumns,
  avoidTemplateColumns = false,
  overrideClass = ""}) {

  const { screenMode } = useWindowResize();

  const currentTemplateColumn = useMemo(() => {
    if(avoidTemplateColumns){
      return "";
    }

    const column = templateColumns[screenMode];
    if(column){
      return column;
    }

    return defaultTempleteColumns[screenMode];
  }, [screenMode]);

  return (
    <div className={`grid_container ${currentTemplateColumn} ${overrideClass}`}>
      {children}
    </div>
  )
}

Grid.GridItem = function GridItem({ children, className = "" }) {
  return (
    <div className={`grid_container_item ${className}`}>
      {children}
    </div>
  )
}

export default Grid