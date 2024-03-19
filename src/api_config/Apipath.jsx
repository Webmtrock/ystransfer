const API_PATH = {
  apiVerifyPhoneOtp: "/otp",
  apiVerifyEnteredOtp: "/verifyOTP",
  apiSignup: "/register",
  apiLogin: "/login",
  apiForgetOtp: "/forgetotp",
  apiVerifyForgotOtp: "/verifyforgetOtp",
  apiUpdateUserPassword: "/updateuser",
  apiGetAllPrograms: "/getprograms",
  apiGetProgramById: "/getprogrambyId/",
  apiGetFilteredPrograms: "/getListCategory?",
  apiGetAllWebinars: "/getwebinar",
  apiGetfilterdWebinar: "/wgetListCategory?",
  apiApplycuponCode: "/getCoupon/",
  apiGetWebinarByID: "/getwebinar/",
  apiGetupcomingprogram: "/upcoming",
  apiUpcomingWebinar: "/upcomingwebinar",
  apiForOrderplace: "/orders",
  apiVerifyPayment: "/paymentverification",
  apiGetSessions: "/getsession/",
  apiGetPurchasedIds: "/getByUserId/",
  apiGetAllSessions: "/getsession",
  apiUpdateSession: "/updateSession",
  apiGetExpert: "/getexpert",
  apiGetExpertByiD: "/getbyid",
  apiGetExpertFilter: "/expgetListCategory?",
  apiGetAllArticle: "/allhealthPedia?",
  apiGetFilterdArticle: "/getListHealthPediaCategory?",
  apiGetArticleById: "/gethealthPedia/",
  apihandellike: "/healthPedialike",
  apiArticleViews: "/healthPediaviews",
  apiGetSessionbyPidsUid: "/getByProgramIdAndUserId",
  apiTrandingBlogs: "/treadingBlog",
  apiGetHealthpediaVideos: "/getVideoblogs",
  apiGetFilterHealthPedia: "/getListHealthPediaVideoCategory?",
  apiGetRelatedBlogs: "/relatedBlogs",
  apiGetPriceByPlan: "/programdurationPrice",
  apiGetChidProfiles: "/profiledata",
  apiGetPurchasedProgram: "/myprogram",
  apiCreateWebinarorder: "/weborders",
  apiVerifyWebinarPayment: "/paymentVerify",
  apiGetPlanPlanTypeForContinuity: "/planTypeANDplanSubtype",
  apiVerifyContinuityPateint: "/continuityVerify",
  apiPostArticleComment: "/createComment",
  apiGetAllComments: "/getComment/",
  apiGetMyWebinar: "/mywebinar",
  apiPostMyQuery: "/createQuery",
  apiGetUserWithChild:"/getUserById/",
  apiUpdateUserData:"/updateprofile",
  apiUpdateChildData:"/updategetUserByIdAndProfileId",
  apiGetChildParent:"/getUserByIdAndProfileId/",
  apiGetReviews:"/getReviewByProgramId/",
  apiCouponforwebinar:'/getCouponWebinar/',
};

export default API_PATH;
