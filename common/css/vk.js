/* eslint-disable object-shorthand */
/* eslint-disable prefer-template */
// eslint-disable-next-line no-var
var cssVersion = 26082022;
var nodeEnv;
if (process.env.DEV_ENV) {
  nodeEnv = process.env.DEV_ENV;
} else {
  nodeEnv = process.env.NODE_ENV;
}
module.exports = {
  css:
    "$special-color:#ffc200;$body-bgcolor:#fff; $navbar-background:#000000; $navbar-first-link-color:#fff; $navbar-first-link-hover-color:#fff; $navbar-top-bgcolor:#fff;	$navbar-bg-color:#fff;	$navbar-border-top:#d5d5d5;	$navbar-border-shadow:#b8b8b8;	$navbar-active-border-bottom-color:#000;	$navbar-link-color:#000;	$hamburger-bg-color:#000;	$sidenav-bg-color:#fff;	$sidenav-color:#000;	$sidenav-border-bottom:#F5F5F5;	$sidenav-arrow-color:#696969;	$layer-bg:rgba(0,0,0,0.5);	$breadcrumb-home-color:#DA4848;	$card-bg-color:#fff; $card-border-bottom:#ebebeb;	$card-text-color:#333333; $card-lead-text-color:#333; $card-lead-date-color:#bababa; $card-date-color:#000; $home-section-txt-color:#000; $home-section-first-bg:#000; $home-section-second-bg:#dfdfdf; $home-section-more-bg:#000000; $home-section-more-color:#fff;	$home-section-more-border:#000000;	$footer-background:#f2f1f1;	$footer-border-bottom:#cbcbcb;	$footer-heading-color:#333;	$footer-link-color:#555;	$footer-trending-color:#cbcbcb;	$photomazzashow-body-color:#fff; $photomazzashow-heading-color:#000; $photomazzashow-blk-bg:#282e34; $photomazzashow-pagination-bg:#000; $photomazzashow-txt-color:#ffffff; $photomazzashow-pagi-color:#b4b4b4; $photomazzashow-caption-color:#9e9e9e; $photomazzashow-border-color:#ffffff; $photomazzashow-view-color:#000000; $photomazzashow-adcard-border:#ccc; $photomazzashow-adcard-txt-color:#aaacab; $shareModalContainer-bg:rgba(0, 0, 0, 0.4); $shareModalContent-bg:#fff; $shareModalHeading-color:#333; $shareModalTxt-color:#878787; $color-black:#000; $color-red:#AD0000; $color-white:#fff; $lb-bg-color:#ebebeb; $lb-border-color:#dadada; $lb-circle-color:#979797; $highlights-txt-color:#6e6e6e; $highlights-border-color:#c9c9c9; $poll-border-color:#c6c6c6; $poll-label-color:#e4e4e4; $poll-answer-color:#67cd00; $videoview-bg-color:#282e34; $videoview-txt-color:#d8d8d8; $poster-txt-color:#fff; $poster-btn-bg:#000000; $poster-border-color:#000000; $poster-btn-txt-color:#fff; $poster-h3-color:#fff; $story-partition-color:#fff; $story-partition-bg-color: #000000; $story-partition-border-color:#979797; $font-family-name:Noto Sans; $font-family-regular:NotoSansKannada-Regular;$image-sitename:vk;$version:" +
    cssVersion +
    "; $path:" +
    nodeEnv +
    "; $folder:" +
    process.env.SITE +
    ";",
  cssVersion: cssVersion,
  nodeEnv: nodeEnv,
};
