import React, {useEffect} from "react";
import CardsRow from "../CardsRow";
import AppCard from "../shared/card/AppCard";
import {useDispatch, useSelector} from "react-redux";
import {deleteTermGroup, getUserTermGroups} from "../../actions/termGroup";
import createCardRows from "../../helpers/createCardRows";
import {LOADING} from "../../helpers/requestStatus";
import Spinner from "../Spinner";
import {useForm} from "react-hook-form";
import TermGroupsControlBar from "../../containres/TermGroupsControlBar";

export default function TermGroupsContent() {

  const {termGroups, status} = useSelector(state => state.termGroupReducer);
  const rows = createCardRows(termGroups);
  const userId = useSelector(state => state.userReducer.id);
  const dispatch = useDispatch();
  const {handleSubmit, register} = useForm();

  useEffect(() => {
    dispatch(getUserTermGroups(userId));
  }, [dispatch, userId]);

  const onGroupDelete = (groupId) => {
    dispatch(deleteTermGroup(groupId, termGroups));
  }

  return (
    <>
      <TermGroupsControlBar/>
      {status === LOADING ? <Spinner/> :
        <div className="content-wrapper">
          {rows.map(row =>
            <CardsRow key={row.id} cards={row.data.map(el =>
              <AppCard
                key={el.id}
                id={el.id}
                cardName={el.name}
                content={el.description}
                onEditApply={() => {}}
                onDelete={() => onGroupDelete(el.id)}
                about="group"
                register={register}
              />)}
            />)}
        </div>
      }
    </>
  );
}
