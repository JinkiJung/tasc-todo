import { plainToClass } from 'class-transformer';
import { useState } from 'react';
import Tasc from '../model/tasc.entity';

const UseTascList = (initialTascList: Tasc[], validator?: Function) => {
    const [ tascList, setTascList] = useState(initialTascList);
    const onTascListChange = (tascs: Tasc[]) => {
      let willUpdate = true;
      if(typeof validator === "function"){
          willUpdate = validator(tascs);
      }
      if(willUpdate){
          setTascList(tascs.sort((a, b) => b.order - a.order));
      }
    };
    const onTascItemChange = (fieldsToUpdate: Partial<Tasc>) => {
      let itemToBeUpdated: Tasc = tascList.filter(x => x.id === fieldsToUpdate.id).pop()!;
      if (itemToBeUpdated){
        const updatedItem = itemToBeUpdated.update(fieldsToUpdate);
        //const updatedItem: Tasc = { ...itemToBeUpdated, ...fieldsToUpdate };
        onTascListChange([...tascList.filter(x => x.id !== updatedItem.id), updatedItem]);
      }
    };
    return { tascList, onTascListChange, onTascItemChange };
  }

  export default UseTascList;