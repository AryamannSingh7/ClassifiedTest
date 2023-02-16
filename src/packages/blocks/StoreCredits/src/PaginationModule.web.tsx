import React, { PureComponent } from 'react';
import {Box, Typography} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {withTranslation} from "react-i18next";

interface OwnProps {
  pagination:any;
  handlePagination:any;
  page:any
}

type Props = OwnProps;

class PaginationModule extends PureComponent<Props> {
  constructor(props:any) {
      super(props);
  }
  render() {
    const { t }: any = this.props;
    return (
      <>
        <Box style={{display:"flex",marginLeft:"15px"}}>
          <Typography style={{marginRight:"5px"}}>{t("Showing")} </Typography>
          <Typography style={{marginRight:"5px",fontWeight:"bold",color:"#FC8434"}}>{this.props.pagination?.total_count < 10 ? this.props.pagination?.total_count : (10 * this.props.page)} </Typography>
          <Typography style={{marginRight:"5px"}}> {t("of")} </Typography>
          <Typography style={{fontWeight:"bold"}}>{this.props.pagination?.total_count} </Typography>
        </Box>
        <Pagination count={this.props.pagination?.total_pages} onChange={this.props.handlePagination} variant="outlined" shape="rounded" />
      </>
    );
  }
}

export default withTranslation()(PaginationModule);
