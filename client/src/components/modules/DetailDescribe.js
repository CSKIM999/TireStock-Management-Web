import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
/**
 *
 * @param {string} title h5 타이틀
 * @param {string} caption captin 설명
 * @param {string} body 본문에 삽입될 내용
 * @returns 반환 => Grid item container xs=5.5 pt:2
 */

const testString = `DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION
DESCRIPTION DESCRIPTION`;

const DetailDescribe = (title, caption, body) => {
  const FAQButton = (
    <Grid item xs={"auto"} sx={{ py: 1 }}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Button variant="contained">HELLO</Button>
        <Typography>012-345-6789</Typography>
      </Stack>
    </Grid>
  );

  return (
    <Grid item xs={5} container flexWrap="nowrap" direction="column">
      <Grid item xs={1} container direction={"row"} alignItems="flex-end">
        <Grid item>
          <Typography
            variant="h5"
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            {title}
          </Typography>
        </Grid>
        <Typography variant="caption" sx={{ fontWeight: "bold", px: 3 }}>
          {caption}
        </Typography>
      </Grid>

      {/* DETAIL - description */}
      {/* TODO : 받아온 정보 나열 */}
      <Grid
        item
        xs={10}
        container
        direction="column"
        justifyContent="space-between"
        sx={{ py: 2 }}
      >
        <Paper
          elevation={0}
          sx={{
            minHeight: 150,
            maxHeight: 250,
            overflow: "auto",
            bgcolor: "background.paper",
          }}
        >
          <Typography>{body ? body : testString}</Typography>
          <Typography>Detail description</Typography>
        </Paper>
        {title === "문의내용" ? "" : FAQButton}
      </Grid>
    </Grid>
  );
};

export default DetailDescribe;
