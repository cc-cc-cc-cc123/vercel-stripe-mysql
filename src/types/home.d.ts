export interface HomeThemeModel {
  main_image?: string;
  background_image?: string;
  classifies?: any;
}

export interface EssayClassifies {
  k: string;
  v: string;
}

export interface HomeGPTsModel {
  gpts_id?: number;
  title?: string;
  url?: string;
  logo?: string;
  description?: string;
  detail?: string;
  images?: [string];
}

export interface HomeArticleModel {
  article_id?: number;
  title?: string;
  description?: string;
  cover_image?: string;
  content_url?: string;
  create_time?: string;
  labels?: [string];
  type?: any;
  title_id?: string;
}

export interface SitemapModel {
  // loc?: string;
  // priority?: number;
  // lastmod?: string;
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
  alternateRefs?: [AlternateRefs];
  // trailingSlash?: boolean;
  // news?: IGoogleNewsEntry;
  // images?: Array<IImageEntry>;
  // videos?: Array<IVideoEntry>;
}

export interface AlternateRefs {
  href?: string;
  hreflang?: string;
}

export interface UserModel {
  email?: string;
  token?: string;
  uid?: string;
  first_login?: boolean;
}

// "like_num": 0,
// "like_pic_num": 0,
// "like_video_num": 0,
// "like_acct_num": 0,
// "like_acct_verify_num": 0,
// "following_num": 0,
// "like_tags": [],
// "following_tags": [],
// "monitor_id": 3,
// "media_name": "ayakayamagishi_",
// "avatar": "https://instagram.fkiv3-1.fna.fbcdn.net/v/t51.2885-19/369970620_866350618470620_1451937517268177903_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fkiv3-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=0FGjiebHyFMAX-9yHaj&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfD0Um9xUAkdzjjzLSJa04Vmaf2SUj9p7RehZJuHpijTig&oe=65A3A6EC&_nc_sid=8b3546",
// "media_url": "https://www.instagram.com/ayakayamagishi_/",
// "status": "REMOVE",
// "identification": "1704854864376849159",
// "tracking_date": "2024-01-10 02:47:45",
// "has_history": false

export interface InsMonitorModel {
  monitor_id?: number;
  media_name?: string;
  avatar?: string;
  media_url?: string;
  status?: "REMOVE" | "NORMAL" | "EXPIRED" | undefined;
  identification?: string;
  profile?: string;

  active_begin_time: ?string;
  active_end_time?: string;
  // 点赞数
  like_num?: integer;
  // 点赞图文数
  like_pic_num?: integer;
  // 点赞视频数
  like_video_num?: integer;
  // 点赞用户数
  like_acct_num?: integer;
  // 点赞认证用户数
  like_acct_verify_num?: integer;
  // 新增关注数
  following_num?: integer;
  un_follow_num?: integer;

  like_tags?: string[];
  following_tags?: string[];
  tracking_date?: string;
  next_tracking_date?: string;
  has_history?: boolean;

  post_report_date?: string;

  next_report_begin?: string;
  next_report_end?: string;
  next_report_show?: string;

  subs_id?: integer;
  item_id?: integer;
  // 枚举: WEEK,MONTH,SEASON,YEAR
  data_type?: "WEEK" | "MONTH" | "SEASON" | "YEAR";
  can_upgrade?: boolean;

  item_name?: string;
  subs_begin?: string;
  subs_end?: string;
}

export interface InsMonitorTimeModel {
  begin_time?: string;
  end_time?: string;
  has_data?: boolean;
  show_time?: string;
  old_data?: boolean;
  data_id?: string;
  data_type?: "WEEK" | "MONTH" | "SEASON" | "YEAR";
  private_mark?: boolean;
}

export interface InsAccountModel {
  is_private?: number;
  media_name?: string;
  media_url?: string;
  profile_pic_url?: string;
  //
  full_name?: string;
  avatar?: string;
}

export interface InsMonitorRankModel {
  media_name?: string;
  media_url?: string;
  avatar?: string;
  full_name?: string;
  rank_no?: integer;
  last_rank_no?: integer;
  like_num?: integer;
  cover_images?: [
    {
      image?: string;
      post_link?: string;
    }
  ];
  new_like?: boolean;
  verify?: boolean;
}

export interface InsCommentsModel {
  content?: string;
  post_url?: string;
  commit_time?: string;
}

export interface InsCommentRanksModel {
  rank_no?: integer;
  last_rank_no?: integer;
  media_name?: string;
  media_url?: string;
  avatar?: string;
  comment_num?: integer;
  comments?: InsCommentsModel[];
  new_comment?: boolean;
}

export interface InsSocialPlatformsModel {
  homepage?: string;
  nickname?: string;
  profile_image?: string;
}

export interface InsPostCommentModel {
  cover_image?: string;
  content?: string;
  link?: string;
  post_time?: string;
  location?: string;
}

export interface InsMonitorInfoModel {
  monitor_id?: number;
  media_name?: string;
  media_url?: string;
  avatar?: string;
  profile?: string;
  // 点赞数
  like_num?: integer;
  // 点赞图文数
  like_pic_num?: integer;
  // 点赞视频数
  like_video_num?: integer;
  // 点赞用户数
  like_acct_num?: integer;
  // 点赞认证用户数
  like_acct_verify_num?: integer;
  // 新增关注数
  following_num?: integer;

  tracking_date?: string;
  next_tracking_date?: string;

  like_user_num?: integer;
  like_avg_per_user_num?: number;
  like_user_verify_num?: integer;

  un_follow_num?: integer;
  active_begin_time?: string;
  active_end_time?: string;
  like_tags?: [string];
  following_tags?: [string];
  new_followings?: [InsAccountModel];
  un_follows?: [InsAccountModel];
  tagged_users?: [InsAccountModel];
  like_ranks?: [InsMonitorRankModel];
  comment_ranks?: [InsCommentRanksModel];
  social_platforms?: {
    snapchat?: InsSocialPlatformsModel[];
    twitter?: InsSocialPlatformsModel[];
    tiktok?: InsSocialPlatformsModel[];
    pinterest?: InsSocialPlatformsModel[];
    linkedin?: InsSocialPlatformsModel[];
  };
  post_list?: [InsPostCommentModel];
  download_url?: string;

  subs_id?: integer;
  item_id?: integer;
  // 枚举: WEEK,MONTH,SEASON,YEAR
  data_type?: "WEEK" | "MONTH" | "SEASON" | "YEAR";
  can_upgrade?: boolean;
  top5comment_users?: string[];

  post_report_date?: string;
  next_report_begin?: string;
  next_report_end?: string;
  next_report_show?: string;
}

export interface OrderModel {
  order_id?: string;
  client_secret?: string;
}

export interface OrderInfoModel {
  item_id?: number;
  name?: string;
  description?: string;
  amount?: number;
  discount_amount?: number;
  monitor_num?: number;
  status?: "unsub" | "normal" | "expire" | "cancel";
  expire_time?: string;
  subs_id?: number;
}

export interface SingleOrderTimesModel {
  buy_week?: number;
  can_buy_week?: number;
}

export interface PaymentHistoryModel {
  name?: string;
  order_id?: string;
  pay_time?: string;
  type?: string;
  amount?: number;
  quantity?: number;
}

export interface UnAddAccountModel {
  sub_begin_time?: string;
  subs_id?: number;
  data_type?: string;
  item_name?: string;
}

export interface FeedbackQuestionModel {
  question_id?: number;
  content?: string;
  type?: "SELECT" | "CHECKBOX" | "INPUT";
  options?: {
    option_id?: number;
    content?: string;
    allows_input?: boolean;
  }[];
  required?: boolean;
}

export interface FeedbackDetailModel {
  survey_id?: number;
  title?: string;
  description?: string;
  questions?: FeedbackQuestionModel[];
}
type Answer = {
  question_id: number;
  option_id?: number;
  input_content?: string;
};

type SurveyResponse = {
  survey_id: number;
  answers: Answer[];
};

export interface AIInsightDetail {
  has_insights?: boolean;
  sub_type?: "WEEK" | "MONTH" | "SEASON" | "YEAR";
  status?: "normal" | "expire" | "cancel";
  future_cycle?: string;
  location?: string;
  mbti_list?: {
    mbti?: string;
    title?: string;
    description?: string;
    best_match?: string;
    probability_str?: string;
  }[];
  relation_ship_analysis_list?: {
    media_name?: string;
    comment_count?: string;
    comment_analysis?: string;
    relation_ship?: string;
  }[];
  interest_and_hobby?: {
    primary_interest?: string;
    primary_interest_desc?: string;
    secondary_interest?: string;
    secondary_interest_desc?: string;
  };
  psychological_profile?: {
    summary?: string;
    description?: string;
    emotional_summary?: string;
    emotional_description?: string;
  };
  unusual_aspects?: {
    summary?: string;
    description?: string;
  };
  financial_situation?: {
    income_level?: string;
    consumption_level?: string;
    description?: string;
  };
  conversation_starters?: string[];
  visited_places?: {
    summary?: string;
    description?: string;
  }[];
}

export interface UserInfo {
  email: string;
  username: string;
  uid: string;
  avatar: string;
  receive_email: string;
  email_notify: boolean;
  market_email_notify: boolean;
}

export interface FakeSearchItemModel {
  id?: number;
  username?: string;
  url?: string;
  name?: string;
  avatar_url?: string;
  profile_description?: string;
  post_count?: number;
  media_count?: number;
  like_count?: number;
  follower_count?: number;
  following_count?: number;
  social_type?: string;
}

export interface FakeSearchModel {
  key?: string;
  user_account_info?: FakeSearchItemModel;
  similar_users?: FakeSearchItemModel[];
}

export interface LeaksFoundCountModel {
  allCount: number;
  sucCount: number;
}
