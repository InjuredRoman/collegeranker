import  { useState, useContext} from 'react';
import { darken, lighten, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridTreeNode } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { GridRowHeightParams } from '@mui/x-data-grid';
import { UserContext } from '../../app-context/userContext';
import  {toPercent, toLetterGrade, getScore} from '../../utils/utilities';

function createData(
  id: number,
  title: string,
  college1: string,
  college2: string,
  filler: string,
  status: string,
//   score: number,
//   acceptance_rate: string,
//   success_score: string,
//   orientation_grad: string,
//   student_support: string,
) {
  return { id, title, college1, college2, filler, status };
}
const og_columns = [
  {field: '', className: 'super-app-theme--header' ,width: 150, sortable: false, headerName: ''},
  {field: 'college1', width: 160, sortable: false, headerName: 'Michigan State University'},
  {field: 'filler', maxWidth: 15, sortable: false, headerName: ''},
  {field: 'college2', width: 160, sortable: false, headerName: 'Carnegie Mellon University'}
];

function makeData(colleges: Array<any>, form: any) {
  let columns: Array<any>=[{field: 'title', className: 'super-app-theme--header' ,width: 150, sortable: false, headerName: ''},]
  let rows: Array<any>=[
  {id: -1, title: '', filler: '', status: 'header'},
  {id: 0, title: 'Your Score', filler: '', status: 'main'},
  {id: 2, title: 'Acceptance Rate', filler: '', status: 'bland'},
  {id: 3, title: 'Success Score', filler: '', status: 'secondary'},
  {id: 1011, title: '',filler: '', status: 'bland'},
  {id: 5, title: 'Value Grade', filler: '', status: 'secondary'},
  {id: 1012, title: '', filler: '', status: 'bland'},
  {id: 1, title: 'Outcomes',filler: '', status: 'secondary'},
  {id: 1013, title: '', filler: '', status: 'bland'},
  {id: 4, title: 'Cost Score', filler: '', status: 'secondary'},
  {id: 1014, title:'', filler: '', status:'bland'},
  {id: 6, title: 'Diversity Score', filler:'', status: 'secondary'},
  ];
  // {field: 'filler', maxWidth: 15, sortable: false, headerName: ''},
  // {field: 'college2', width: 160, sortable: false, headerName: 'Carnegie Mellon University'}
  for (let i = 0; i < colleges.length; i++) {
    let key = 'college' + i.toString();
    let college = colleges[i];
    console.log(key, college['instnm']);
    columns.push(
      {field: key, width: 160, sortable: false, headerName: ''}//college['instnm']}
    );
    if (i !== colleges.length-1) {
      columns.push(
        {field: 'filler', maxWidth: 15, sortable: false, headerName: ''},
      );
    }
    let cost_prefix = '';
    if (college['npt43_priv'] > 0) {
      cost_prefix = 'npt43_priv';
    }
    else {
      cost_prefix = 'npt43_pub';
    }
    //College INSTNMs
    rows[0][key] = college['instnm']
    //Your Score
    rows[0+1][key] = toLetterGrade((getScore(college, 'success') + getScore(college, 'outcomes') + getScore(college, cost_prefix) + getScore(college, 'economic_inclusion_score')) / 4)
    //Acceptance Rate
    rows[1+1][key] = toPercent(college['adm_rate']);
    //Success Score
    rows[2+1][key] = toLetterGrade(getScore(college, 'success'))
    rows[3+1][key] = ''
    //Value Grade
    // TODO fix this
    let cost = getScore(college, `npt4${form['familyIncome']}`)
    let value = getScore(college, `value_${form['familyIncome']}`)
    console.log('COST BELOW');
    console.log(cost);
    console.log('VALUE BELOW');
    console.log(value);
    // let income = getScore(college, 'weighted_income');
    rows[4+1][key] = toLetterGrade(value);
    rows[5+1][key] = ''
    // Outcomes
    rows[6+1][key] = toLetterGrade(getScore(college, 'outcomes'));
    rows[7+1][key] = ''
    // Cost Score
    // let costScore = getScore(college, cost_prefix);
    rows[8+1][key] = toLetterGrade(cost);
    rows[9+1][key] = ''
    // Diversity Score
    let eci = getScore(college, 'economic_inclusion_score')
    let res = '';
    if (college['social_diversity_score'] === 0) {
      res = 'n/a'
    }
    else {
      let sds = getScore(college, 'social_diversity_score')
      res = toLetterGrade(.5*eci + .5*sds);
    }
    rows[10+1][key] = res;
  }

  return {
    columns,
    rows
  }
}

const og_rows = [
  createData(0,'Your Score', '92', '86','', 'main'),
  createData(2,'Acceptance Rate', '20%', '71%','', 'bland'),
  createData(3,'Success Score', 'A-', 'B+','', 'secondary'),
  createData(1011,'', '', '','', 'bland'),
  createData(5,'Value Grade', 'A', 'A', '','secondary'),
  createData(1012,'', '', '','', 'bland'),
  createData(1,'Outcomes', 'HI/HD', 'HI/HD','', 'secondary'),
  createData(1013,'', '', '','', 'bland'),
  createData(4,'Cost Score', '80k', '156k', '','secondary'),
  createData(1014,'', '', '','', 'bland'),
  createData(6,'Diversity Score', 'High', 'High','', 'secondary'),
];
const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

const mainBackgroundColor = '#707AE6';
const secondaryBackgroundColor = '#A4B3FF';
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '.MuiDataGrid-cell': {
    display:'flex',
    justifyContent: 'center',
    borderBottom: 'none',
    '&:nth-col(0n)': {
      justifyContent: 'start'
    },

  },
  '& .MuiDataGrid-withBorderColor': {
    border: 2,
    borderColor: 'black'
  },
  '.MuiDataGrid-columnHeaderTitle': {
    color: '#222224',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  // '.MuiDataGrid-columnHeader': {
  //   // backgroundColor: '#FADE88',
  //   border: 2,
  //   borderColor: 'black'
  // },
  '& .super-app-theme--bland': {
    '&:MuiDataGrid-row': {
      height: '20px',
    }
  },
  '& .super-app-theme--main': {
    backgroundColor: mainBackgroundColor,
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        mainBackgroundColor,
        'dark'
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        mainBackgroundColor,
        'dark',
      ),
      '&:hover': {
      backgroundColor: getSelectedBackgroundColor(
        mainBackgroundColor,
        'light',
        ),
      },
    },
  },
  '& .super-app-theme--header': {
  },
  '& .super-app-theme--secondary': {
    backgroundColor: secondaryBackgroundColor,
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        secondaryBackgroundColor,
        'dark'
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        secondaryBackgroundColor,
        'dark',
      ),
      '&:hover': {
      backgroundColor: getSelectedBackgroundColor(
        secondaryBackgroundColor,
        'dark',
        )
      },
    },
  },
  '& .super-app-theme--tertiary': {
    color: '#222224',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: '10px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
    backgroundColor: secondaryBackgroundColor,
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        secondaryBackgroundColor,
        'dark'
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        secondaryBackgroundColor,
        'dark',
      ),
      '&:hover': {
      backgroundColor: getSelectedBackgroundColor(
        secondaryBackgroundColor,
        'dark',
        )
      },
    },
  },
}));
export default function CoolTable() {
  const {user, colleges, form, updateState } = useContext(UserContext);
  console.log('colleges');
  console.log(colleges);
  // const { data } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 25,
  // });
  // console.log(data);
  // const [columns, setColumns] = useState(og_columns)
  // const [rows, setRows] = useState(og_rows);
  const [notif, setNotif] = useState(false);
  const [priorColClicked, setPrior] = useState('');
  function handleOpen(tableToOpen: string, p:any) : void {
    let rowsNew = og_rows;

    console.log(p.row.title);
    // open your table here Agi!

    // - yo momma
  }
  let data: any =  {
    rows: og_rows,
    columns: og_columns
  };
  if (colleges && colleges.length > 0){
    data = makeData(colleges, form);//{columns, rows};
  }
  const handleClose = (e: any) => {
    setNotif(false);
  };
  return (
    <Box >
      <StyledDataGrid
        sx={{
              width:"fit-content", 
              "& .MuiTableCell-root": {
                border: "0px solid"
              },
              '& .MuiDataGrid-withBorderColor': {
                border: 0,

              },
              '& .cold': {
                backgroundColor: '#b9d5ff91',
                color: '#1a3e72',
                // borderTop: 2,
                // borderBottom: 2,

              },
              '& .orange': {
                backgroundColor: '#FADE88',
                borderLeft: 2,
                borderRight:2
                // color: '#1a3e72',
              },
              '& .header': {
                backgroundColor: '#FADE88',
                borderLeft: 2,
                borderRight:2,
                borderTop: "2px solid",
                // color: '#1a3e72',
              },
              '& .lightblue': {

                backgroundColor: '#A4B3FF',
                borderTop: 2,
                borderBottom: 2,
                // border:2
                // color: '#1a3e72',
              },
              // '& .fullybordered': {
                // border:2,
                // borderBottom: 0,
                // borderTop: 0
              // }
              }}
        slots={{
          columnHeaders: () => null,
        }}
        getRowHeight={({ id }: GridRowHeightParams) => {
          if (1000 < id && id < 1069) {
            return 20;
          }
      
          return 52;

        }}
        disableColumnMenu
        disableColumnFilter
        loading={colleges === undefined || colleges.length === 0}
        onRowClick={(p, e) => {handleOpen('success_score', p);}}
        {...data}
        // @ts-ignore
        getCellClassName={(params: GridCellParams<any, any, number>) => {
          if (params.row.title.includes('Score') ||
              params.row.title.includes('Grade') ||
              params.row.title.includes('Outcomes')) {
            console.log('happened for:');
            console.log(params.row);
            return 'lightblue';//secondaryBackgroundColor;
          }
          else if (params.field.startsWith('college')) {
            if (params.row.status == 'header'){
              return 'header';
            }
            return 'orange';
          } 
          // console.log("LOOKIE HERE");
          // console.log(params.value);
          // console.log(params.field);
          // console.log(params.row);
          // return params.value >= 15 ? 'hot' : 'cold';
        }}
        getRowClassName={(params) => `super-app-theme--${params.row.status}`}
      />
      <Snackbar open={notif} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {/* @ts-ignore */}
          Now showing {priorColClicked.toLowerCase()} details.
        </Alert>
      </Snackbar>
    </Box>
  );};
