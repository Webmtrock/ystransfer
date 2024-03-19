import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "userrole",
  initialState: {
    counter: "",
    Price: {},
    sessions: {},
    batch: "",
    programId: "",
    documentId: "",
    foterCate: "",
    profileid: "",
    articleId: "",
    expertid:"",
    expertname:"",
    loginAndpaymentstatus:false,
    ParantData:{},
  },
  reducers: {
    UserRole: (state, action) => {
      state.counter = action.payload;
    },

    ProgramPrice: (state, action) => {
      state.Price = action.payload;
    },

    AllSessions: (state, action) => {
      state.sessions = action.payload;
    },

    Batch: (state, action) => {
      state.batch = action.payload;
    },

    Programid: (state, action) => {
      state.programId = action.payload;
    },

    Documentid: (state, action) => {
      state.documentId = action.payload;
    },
    FooterCategory: (state, action) => {
      state.foterCate = action.payload;
    },
    ProfileID: (state, action) => {
      state.profileid = action.payload;
    },
    ArticleID: (state, action) => {
      state.articleId = action.payload;
    },
    ExpertId:(state,action)=>{
       state.expertid=action.payload
    },
    ExpertName:(state,action)=>{
      state.expertname=action.payload
    },
    LoginPaymentStatus:(state,action)=>{
      state.loginAndpaymentstatus=action.payload
    },
    ParantEdit:(state,action)=>{
     state.ParantData=action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  UserRole,
  ProgramPrice,
  AllSessions,
  Batch,
  Programid,
  Documentid,
  SessionExpiredTime,
  MakeActive,
  FooterCategory,
  ProfileID,
  ArticleID,
  ExpertId,
  ExpertName,
  LoginPaymentStatus,
  ParantEdit,
} = counterSlice.actions;
export default counterSlice.reducer;
