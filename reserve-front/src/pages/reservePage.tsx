import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from 'styled-components';
import { RootReducerType } from '../state/store';
import { getTicketAirline, getTicketAirport } from '../state/actions/ticketAction';

const StyledMainDiv = style.div`
  margin: 0px auto;
  width: 100%;
  height: 620px;
  border: 1px solid rgba(190, 190, 190, .5);
  border-radius: 5px;
`;
const StyledFontDiv = style.div`
  width: 100%;
  height: 100%;
  color: #494AE6;
  text-align: right;
  line-height: 55px;
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    height: 40,
  },
}));

interface CustomFieldProps {
  labelText: string;
  dataList: {
    value: string;
    display: string;
  }[];
  onChangeAfter: (value: string) => void;
}

const columns = [
  { field: 'id', hide: true },
  { field: 'airline', headerName: '항공사', width: 100, sortable: false },
  { field: 'start_airport', headerName: '출발지', width: 120, sortable: false },
  { field: 'end_airport', headerName: '도착지', width: 120, sortable: false },
  { field: 'start_date', headerName: '출발일', width: 120, sortable: false },
  { field: 'start_time', headerName: '출발시간', width: 110, sortable: false },
  { field: 'end_time', headerName: '도착시간', width: 110, sortable: false },
  { field: 'price', headerName: '금액', width: 120, sortable: false },
  { field: 'rest', headerName: '잔여석', width: 100, sortable: false },
];

const rows = [
  {
    id: '1',
    airline: '대한항공',
    start_airport: '인천공항',
    end_airport: '프랑스공항',
    start_date: '2021-09-20',
    start_time: '09:00',
    end_time: '15:00',
    price: '1,152,000',
    rest: '7/15',
  },
];

const emptyState = [
  {
    display: 'None',
    value: '',
  },
];

const memberCountData = [
  {
    display: 'None',
    value: '',
  },
  {
    display: '1명',
    value: '1',
  },
  {
    display: '2명',
    value: '2',
  },
  {
    display: '3명',
    value: '3',
  },
  {
    display: '4명',
    value: '4',
  },
  {
    display: '5명',
    value: '5',
  },
];

const CustomField: React.FC<CustomFieldProps> = ({
  labelText,
  dataList,
  onChangeAfter,
}): JSX.Element => {
  const classes = useStyles();
  const [value, setvalue] = React.useState('');

  const handleChange = (event: any) => {
    const data = event.target.value;
    setvalue(data);
    onChangeAfter(data);
  };

  return (
    <Grid container item xs={3}>
      <Grid item xs={3}>
        <StyledFontDiv>{labelText}</StyledFontDiv>
      </Grid>
      <Grid item xs={9}>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            className={classes.selectEmpty}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={handleChange}
          >
            {dataList.map((d) => {
              return (
                <MenuItem key={d.value} value={d.value}>
                  {d.display}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

const ReservePage = (): JSX.Element => {
  const history = useHistory();
  const memberReducer = useSelector((state: RootReducerType) => state.memberReducer);

  const [airlineData, setAirlineData] = useState(emptyState);
  const [startAirportData, setStartAirportData] = useState(emptyState);
  const [endAirportData, setEndAirportData] = useState(emptyState);

  const [memberCount, setMemberCount] = useState('');
  const [airline, setAirline] = useState('');
  const [startAirport, setStartAirport] = useState('');
  const [endAirport, setEndAirport] = useState('');
  const [startDate, setStartDate] = useState('2021-09-20');
  const [startTime, setStartTime] = useState('09:00');

  const getAirlineData = async () => {
    const response = await getTicketAirline();

    if (response.success) {
      const data = response.data.map((d) => {
        return {
          display: d.title,
          value: d.code,
        };
      });
      setAirlineData([
        {
          display: 'None',
          value: '',
        },
        ...data,
      ]);
    }
  };
  const getStartAirportData = async () => {
    const response = await getTicketAirport('start_airport');

    if (response.success) {
      const data = response.data.map((d) => {
        return {
          display: d.start_airport,
          value: d.start_airport,
        };
      });
      setStartAirportData([
        {
          display: 'None',
          value: '',
        },
        ...data,
      ]);
    }
  };
  const getEndAirportData = async () => {
    const response = await getTicketAirport('end_airport');

    if (response.success) {
      const data = response.data.map((d) => {
        return {
          display: d.end_airport,
          value: d.end_airport,
        };
      });
      setEndAirportData([
        {
          display: 'None',
          value: '',
        },
        ...data,
      ]);
    }
  };

  useEffect(() => {
    // if (!memberReducer.accessToken) {
    //   alert('로그인 후 이용이 가능합니다.');
    //   history.push('/login');
    //   return;
    // }

    getAirlineData();
    getStartAirportData();
    getEndAirportData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeMemberCount = (value: string) => {
    setMemberCount(value);
  };
  const onChangeAirline = (value: string) => {
    setAirline(value);
  };
  const onChangeStartAirport = (value: string) => {
    setStartAirport(value);
  };
  const onChangeEndAirport = (value: string) => {
    setEndAirport(value);
  };
  const onChangeStartDate = (event: any) => {
    setStartDate(event.target.value);
  };
  const onChangeStartTime = (event: any) => {
    setStartTime(event.target.value);
  };

  const searchTicket = () => {
    console.log(memberCount);
    console.log(airline);
    console.log(startAirport);
    console.log(endAirport);
    console.log(startDate);
    console.log(startTime);
  };

  return (
    <StyledMainDiv>
      <div>
        <Grid container style={{ margin: '10px 0px 0px 0px' }}>
          <CustomField
            labelText="인원"
            dataList={memberCountData}
            onChangeAfter={onChangeMemberCount}
          />
          <CustomField
            labelText="출발지"
            dataList={startAirportData}
            onChangeAfter={onChangeStartAirport}
          />
          <Grid container item xs={3}>
            <Grid item xs={4}>
              <StyledFontDiv>출발일</StyledFontDiv>
            </Grid>
            <Grid item xs={8}>
              <TextField
                style={{ margin: '10px 0px 0px 15px', width: '140px' }}
                id="date"
                type="date"
                defaultValue={startDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onChangeStartDate}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <CustomField labelText="항공사" dataList={airlineData} onChangeAfter={onChangeAirline} />
          <CustomField
            labelText="도착지"
            dataList={endAirportData}
            onChangeAfter={onChangeEndAirport}
          />
          <Grid container item xs={3}>
            <Grid item xs={4}>
              <StyledFontDiv>출발시간</StyledFontDiv>
            </Grid>
            <Grid item xs={8}>
              <TextField
                style={{ margin: '10px 0px 0px 15px', width: '140px' }}
                id="time"
                type="time"
                defaultValue={startTime}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                onChange={onChangeStartTime}
              />
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Button
              style={{ margin: '10px 0px 0px 20px' }}
              className="ButtonStyle"
              variant="contained"
              color="primary"
              onClick={searchTicket}
            >
              조회하기
            </Button>
          </Grid>
        </Grid>
        <div style={{ marginTop: '15px', height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
        <Button
          style={{ margin: '10px 15px 0px 0px', float: 'right', width: '150px', height: '60px' }}
          className="ButtonStyle"
          variant="contained"
          color="secondary"
        >
          예약하기
        </Button>
      </div>
    </StyledMainDiv>
  );
};

export default ReservePage;