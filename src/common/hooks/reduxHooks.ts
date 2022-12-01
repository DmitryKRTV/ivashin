import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../../app/Redux/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector