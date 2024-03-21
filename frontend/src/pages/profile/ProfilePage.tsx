import { makeStyles } from "@mui/styles";
import ResponsiveBox from "../../components/utilities/ResponsiveBox";
import PageBody from "../../components/commons/PageBody";
import { Check, Close, EditOutlined } from "@mui/icons-material";
import useCollegeStore from "../../store/college/college.store";
import { useState } from "react";
import FormDetails from "./components/FormDetails";
import { Button } from "@mui/material";

const useStyles = makeStyles(
    (theme) => ({
        profileBanner: {
            height: '200px',
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.3)',
            padding: '10px',
            [theme.breakpoints.up('md')]: {
                height: '350px'
            }
        },
        profileImgWrapper: {
            width: '100%',
            height: '100px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            backgroundColor: theme.palette.secondary.main,
            borderRadius: '15px',
            [theme.breakpoints.up('md')]: {
                height: '200px'
            }
        },
        profileImg: {
            borderRadius: '50%',
            height: '60px',
            width: '60px',
            border: '1px solid ' + theme.palette.primary.main,
            backgroundColor: theme.palette.light.main,
            transform: 'translateX(15px)translateY(20px)',
            transition: '0.3s ease-in-out',
            [theme.breakpoints.up('md')]: {
                height: '100px',
                width: '100px',
                transform: 'translateX(20px)translateY(25px)',
            }
        },
        profileNameWrapper: {
            padding: '18px 8px',
            position: 'relative',
            [theme.breakpoints.up('md')]: {
                padding: '25px 16px',
            }
        },
        profileName: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '5px'
        },
        editBtn: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            width: '30px',
            borderRadius: '50%',
            backgroundColor: theme.palette.light.main,
            border: '1px solid ' + theme.palette.primary.main
        },
        bannerEditBtn: {
            position: 'absolute',
            right: '5px',
            top: '5px'
        },
        profileForm: {
            width: '100%'
        }
    })
);

const EditIconButton = ({ onClick }: any) => {
    const classes = useStyles();

    return (
        <div className={classes.editBtn} onClick={onClick} role="button">
            <EditOutlined fontSize="small" />
        </div>
    )
}

export default function ProfilePage() {
    const classes = useStyles();
    const [canEdit, setCanEdit] = useState(false);
    const form = useCollegeStore((state) => state.form);
    const setForm = useCollegeStore((state) => state.setForm);
    const selectedColleges = useCollegeStore((state) => state.selectedColleges);
    const setSelectedCollege = useCollegeStore((state) => state.setSelectedCollege);
    const [formDetail, setFormDetail] = useState({ ...form });
    const [colleges, setColleges] = useState([...selectedColleges]);

    const onEditButtonClick = () => {
        if (!canEdit) {
            setCanEdit(true);
        } else {
            setFormDetail(form);
            setColleges(selectedColleges);
            setCanEdit(false);
        }
    }

    const saveChanges = () => {
        setForm(formDetail);
        setSelectedCollege(colleges);
        setCanEdit(false);
    }

    return (
        <ResponsiveBox>
            <PageBody>
                <div className={classes.profileBanner}>
                    <div className={classes.profileImgWrapper}>
                        <div className={classes.profileImg}></div>
                    </div>
                    <div className={classes.profileNameWrapper}>
                        <div className={classes.bannerEditBtn}>
                            {
                                canEdit ?
                                    <>
                                        <Button onClick={saveChanges} variant="contained" size="small" endIcon={<Check />} style={{ marginRight: '5px' }}>
                                            Save
                                        </Button>
                                        <Button variant="outlined" size="small" endIcon={<Close />} onClick={onEditButtonClick}>
                                            Cancel
                                        </Button>
                                    </>
                                    :
                                    <EditIconButton onClick={onEditButtonClick} />
                            }
                        </div>
                        <div className={classes.profileName}>{form.name}</div>
                    </div>
                </div>
                <div className={classes.profileForm}>
                    <FormDetails
                        canEdit={canEdit}
                        formDetail={formDetail}
                        setFormDetail={setFormDetail}
                        colleges={colleges}
                        setColleges={setColleges}
                    />
                </div>
            </PageBody>
        </ResponsiveBox>
    );
}