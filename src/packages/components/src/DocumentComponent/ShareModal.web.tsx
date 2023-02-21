import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { IconButton, Typography, Dialog, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

const ShareDocumentModal = ({ isOpen, handleClose, heading, documentURL }: any) => {
  const sharePopupWidth = 500;
  const sharePopupHeight = 700;
  const shareTitle = "TI 1 Final Leap";

  return (
    <Dialog fullWidth onClose={() => handleClose()} open={isOpen} className="select-meeting">
      <MuiDialogTitle disableTypography className="dialog-heading">
        <Typography variant="h6" className="bold-text">
          {heading}
        </Typography>
        <IconButton onClick={() => handleClose()}>
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <DialogContent>
        <div className="share-box">
          <FacebookShareButton
            url={documentURL}
            title={shareTitle}
            windowWidth={sharePopupWidth}
            windowHeight={sharePopupHeight}
            // @ts-ignore
            children={<FacebookIcon />}
            translate
          />
          <TwitterShareButton
            url={documentURL}
            title={shareTitle}
            windowWidth={sharePopupWidth}
            windowHeight={sharePopupHeight}
            // @ts-ignore
            children={<TwitterIcon />}
            translate
          />
          <WhatsappShareButton
            url={documentURL}
            title={shareTitle}
            windowWidth={sharePopupWidth}
            windowHeight={sharePopupHeight}
            separator=":: "
            // @ts-ignore
            children={<WhatsappIcon />}
            translate
          />
          <LinkedinShareButton
            url={documentURL}
            title={shareTitle}
            windowWidth={sharePopupWidth}
            windowHeight={sharePopupHeight}
            // @ts-ignore
            children={<LinkedinIcon />}
            translate
          />
          <EmailShareButton
            url={documentURL}
            title={shareTitle}
            windowWidth={sharePopupWidth}
            windowHeight={sharePopupHeight}
            // @ts-ignore
            children={<EmailIcon />}
            translate
          />
          <RedditShareButton
            url={documentURL}
            title={shareTitle}
            windowWidth={sharePopupWidth}
            windowHeight={sharePopupHeight}
            // @ts-ignore
            children={<RedditIcon />}
            translate
          />
          <TelegramShareButton
            url={documentURL}
            title={shareTitle}
            windowWidth={sharePopupWidth}
            windowHeight={sharePopupHeight}
            // @ts-ignore
            children={<TelegramIcon />}
            translate
          />
          <TumblrShareButton
            url={documentURL}
            title={shareTitle}
            windowWidth={sharePopupWidth}
            windowHeight={sharePopupHeight}
            // @ts-ignore
            children={<TumblrIcon />}
            translate
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDocumentModal;
