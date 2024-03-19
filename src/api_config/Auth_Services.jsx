import API_PATH from "./Apipath";
import http from "./http";

export async function OtpPhoneVerify(data) {
  return http.post(API_PATH.apiVerifyPhoneOtp, data);
}

export async function OtpEnter(data) {
  return http.post(API_PATH.apiVerifyEnteredOtp, data);
}

export async function SignupApi(data) {
  return http.post(API_PATH.apiSignup, data);
}

export async function LoginApi(data) {
  return http.post(API_PATH.apiLogin, data);
}

export async function ForGotOtp(data) {
  return http.post(API_PATH.apiForgetOtp, data);
}

export async function ForgotOtpEnter(data) {
  return http.post(API_PATH.apiVerifyForgotOtp, data);
}

export async function updateUserPassword(data) {
  return http.put(API_PATH.apiUpdateUserPassword, data);
}

export async function GetAllPrograms() {
  return http.get(API_PATH.apiGetAllPrograms);
}

export async function GetProgramsById(data) {
  return http.get(API_PATH.apiGetProgramById + data);
}

export async function getfilteredPrograms(stringData) {
  return http.get(API_PATH.apiGetFilteredPrograms + stringData);
}

export async function getAllWebinar() {
  return http.get(API_PATH.apiGetAllWebinars);
}

export async function getfilteredWebinar(stringData) {
  return http.get(API_PATH.apiGetfilterdWebinar + stringData);
}

export async function GetPlanPayment(data) {
  return http.post(API_PATH.apiGetPriceByPlan, data);
}

export async function Applycuponcode(cupondata) {
  return http.get(
    API_PATH.apiApplycuponCode +
      cupondata.cupancode +
      "/" +
      cupondata.plan
      +"/"+
      cupondata.plantype
      +"/"+
      cupondata.programId +
      "/" +
      cupondata.userId +
      "/" +
      cupondata.discountedprice
  );
}
//For Program Discount

//For Webinar Discount
export async function Applywebinarcuponcode(coupondata) {
  return http.get(
    API_PATH.apiCouponforwebinar +
      coupondata.Coupon +
      "/" +
      coupondata.webinarId +
      "/" +
      coupondata.userId +
      "/" +
      coupondata.Price
  );
}
//For Webinar Discount

export async function GetWeinarById(Id) {
  return http.get(API_PATH.apiGetWebinarByID + Id);
}

export async function GetUpcomingProgram(data) {
  return http.post(API_PATH.apiGetupcomingprogram,data);
}

export async function GetUpcomingWebinar(data) {
  return http.post(API_PATH.apiUpcomingWebinar,data);
}

export async function sendOrderPrice(_amount) {
  return http.post(API_PATH.apiForOrderplace, _amount);
}

export async function VerifyPayment(data) {
  return http.post(API_PATH.apiVerifyPayment, data);
}

export async function GetSessions(Pid, uid) {
  return http.get(API_PATH.apiGetSessions + Pid + "/" + uid);
}

export async function GetPurchasedPrograms(uid) {
  return http.get(API_PATH.apiGetPurchasedIds + uid);
}

export async function GetAllSessions() {
  return http.get(API_PATH.apiGetAllSessions);
}

export async function updateSession(data) {
  return http.put(API_PATH.apiUpdateSession, data);
}

export async function GetAllExpert() {
  return http.get(API_PATH.apiGetExpert);
}

export async function GetExpertById(data) {
  return http.post(API_PATH.apiGetExpertByiD, data);
}

export async function getfilteredExpert(stringData) {
  return http.get(API_PATH.apiGetExpertFilter + stringData);
}

export async function getAllArticles(page,size) {
  return http.get(API_PATH.apiGetAllArticle+"page"+"="+page+"&"+"size"+"="+size);
}

export async function getfilteredArticle(stringData) {
  return http.get(API_PATH.apiGetFilterdArticle + stringData);
}

export async function GetArticleById(slug) {
  return http.get(API_PATH.apiGetArticleById + slug);
}

export async function ArticleLiked(data) {
  return http.post(API_PATH.apihandellike, data);
}

export async function ArticleView(data) {
  return http.post(API_PATH.apiArticleViews, data);
}

export async function GetSessionbypu(data) {
  return http.post(API_PATH.apiGetSessionbyPidsUid, data);
}

export async function GetTrandingsBlogs() {
  return http.get(API_PATH.apiTrandingBlogs);
}

export async function getAllHealthpideaVideo() {
  return http.get(API_PATH.apiGetHealthpediaVideos);
}

export async function getfilteredHealthPedia(stringData) {
  return http.get(API_PATH.apiGetFilterHealthPedia + stringData);
}

export async function GetRelatedBlogs(data) {
  return http.post(API_PATH.apiGetRelatedBlogs, data);
}

export async function getChildProfiles(data) {
  return http.post(API_PATH.apiGetChidProfiles, data);
}

export async function getPurchasedProgram(data) {
  return http.post(API_PATH.apiGetPurchasedProgram, data);
}

export async function CreateWebinarOrder(data) {
  return http.post(API_PATH.apiCreateWebinarorder, data);
}

export async function verifyWebinarpayment(data) {
  return http.post(API_PATH.apiVerifyWebinarPayment, data);
}

export async function GetPlan_PlanType(data) {
  return http.post(API_PATH.apiGetPlanPlanTypeForContinuity, data);
}

export async function VerifyContinuity(data) {
  return http.post(API_PATH.apiVerifyContinuityPateint, data);
}

export async function PostComment(data) {
  return http.post(API_PATH.apiPostArticleComment, data);
}

export async function GetComment(id) {
  return http.get(API_PATH.apiGetAllComments + id);
}

export async function GetMyWebinar(data) {
  return http.post(API_PATH.apiGetMyWebinar, data);
}

export async function PostMyQuery(data) {
  return http.post(API_PATH.apiPostMyQuery, data);
}

export async function GetUserandChild(id) {
  return http.get(API_PATH.apiGetUserWithChild+id);
}

export async function UpdateUser(data) {
  return http.put(API_PATH.apiUpdateUserData,data);
}

export async function UpdateChild(data) {
  return http.put(API_PATH.apiUpdateChildData,data);
}

export const HandelGetUserChild=async(user,child)=>{
  return http.get(API_PATH.apiGetChildParent+user+"/"+child);
}

export const GetProgramReviews=async(id)=>{
  return http.get(API_PATH.apiGetReviews+id)
}


//Testing Team Auth Api Function
export async function handelteamauth(data){
    return http.post(API_PATH.apiforteamauth,data); 
}

