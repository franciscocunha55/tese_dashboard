import React, { useState } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";

// styles
import useStyles from "./styles";

// components

import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import mock from "../dashboard/mock";
import BigStat from "../dashboard/components/BigStat/BigStat";



const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];

export default function Graficos(props) {
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  return (
      <>
        <div style={{margin:'30px'}}>
          <PageTitle title="Graficos"/>

          <Grid container spacing={4}>
            <Grid item lg={6} md={6} sm={6} xs={12} >

                <Widget
                    bodyClass={classes.mainChartBody}
                    header={
                      <div className={classes.mainChartHeader}>
                        <Typography
                            variant="h5"
                            color="text"
                            colorBrightness="secondary"
                        >
                          Daily Line Chart
                        </Typography>
                        <div className={classes.mainChartHeaderLabels}>
                          <div className={classes.mainChartHeaderLabel}>
                            <Dot color="warning" />
                            <Typography className={classes.mainChartLegentElement}>
                              Tablet
                            </Typography>
                          </div>
                          <div className={classes.mainChartHeaderLabel}>
                            <Dot color="primary" />
                            <Typography className={classes.mainChartLegentElement}>
                              Mobile
                            </Typography>
                          </div>
                          <div className={classes.mainChartHeaderLabel}>
                            <Dot color="secondary" />
                            <Typography className={classes.mainChartLegentElement}>
                              Desktop
                            </Typography>
                          </div>
                        </div>
                        <Select
                            value={mainChartState}
                            onChange={e => setMainChartState(e.target.value)}
                            input={
                              <OutlinedInput
                                  labelWidth={0}
                                  classes={{
                                    notchedOutline: classes.mainChartSelectRoot,
                                    input: classes.mainChartSelect,
                                  }}
                              />
                            }
                            autoWidth
                        >
                          <MenuItem value="daily">Daily</MenuItem>
                          <MenuItem value="weekly">Weekly</MenuItem>
                          <MenuItem value="monthly">Monthly</MenuItem>
                        </Select>
                      </div>
                    }
                >
                  <ResponsiveContainer width="100%" minWidth={500} height={350}>
                    <ComposedChart
                        margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                        data={mainChartData}
                    >
                      <YAxis
                          ticks={[0, 2500, 5000, 7500]}
                          tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                          stroke={theme.palette.text.hint + "80"}
                          tickLine={false}
                      />
                      <XAxis
                          tickFormatter={i => i + 1}
                          tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                          stroke={theme.palette.text.hint + "80"}
                          tickLine={false}
                      />
                      <Area
                          type="natural"
                          dataKey="desktop"
                          fill={theme.palette.background.light}
                          strokeWidth={0}
                          activeDot={false}
                      />
                      <Line
                          type="natural"
                          dataKey="mobile"
                          stroke={theme.palette.primary.main}
                          strokeWidth={2}
                          dot={false}
                          activeDot={false}
                      />
                      <Line
                          type="linear"
                          dataKey="tablet"
                          stroke={theme.palette.warning.main}
                          strokeWidth={2}
                          dot={{
                            stroke: theme.palette.warning.dark,
                            strokeWidth: 2,
                            fill: theme.palette.warning.main,
                          }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </Widget>


            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              {mock.bigStat.map(stat => (
                  <Grid item  xs={12} key={stat.product}>
                    <BigStat {...stat} />
                  </Grid>
              ))}
            </Grid>
          </Grid>


        </div>




      </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
        randomValue <= min ||
        randomValue >= max ||
        (lastValue && randomValue - lastValue > maxDiff)
        ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
