import { combineReducers } from "redux";
import runners from './runners';
import form_fields from "./form_fields";

export default combineReducers({ runners, form_fields });