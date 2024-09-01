import React, {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {useMutation, useQuery} from "react-query";
import {Controller, useForm} from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from "@mui/material";
import RenderFormInput from "../../Components/RenderFormInput/RenderFormInput";
import {SimpleTreeView, TreeItem} from "@mui/x-tree-view";
import {fakeOrganizations} from "../../@shared/const";
import {CheckOutlined} from "@mui/icons-material";
import {useSnackbar} from "../../hooks/useSnackbar";

const UserCrud = () => {
  const {id} = useParams();
  const [pageType, setPageType] = useState('CREATE');
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(null);
  const [open, setOpen] = useState(false);
  const [organsLinear, setOrgansLinear] = useState([]);
  const {getApi, sendRequest} = useAuth();
  const {isLoading, mutate} = useMutation({
    mutationFn: sendRequest
  });
  const snackbar = useSnackbar();
  const {
    data,
    status,
    refetch
  } = useQuery({
    queryKey: [`http://localhost:8000/api/user/id?id=${id}`],
    queryFn: getApi,
    select: (res) => res.data,
    enabled: (!!id && pageType === 'EDIT')
  });

  useEffect(() => {
    if (id === 'new') {
      setPageType('CREATE');
    } else {
      setPageType('EDIT');
    }
  }, [id, setPageType]);

  const {
    data: organizations,
    status: organizationStatus,
    refetch: organizationRefetch
  } = useQuery({
    queryKey: [`http://localhost:8000/api/organizations/root-organization`],
    queryFn: getApi,
    select: (res) => res.data,
    enabled: !!id,
  });
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    formState: {errors, isDirty},
    control,
    setValue,
    watch,
    getValues,
  } = useForm();

  const userItems = useMemo(
    () => [
      {
        name: "firstName",
        inputType: "text",
        label: "نام",
        elementProps: {
          defaultValue: data?.firstName || '',
        }
      },
      {
        name: "lastName",
        inputType: "text",
        label: "نام خانوادگی",
        elementProps: {
          defaultValue: data?.lastName || '',
        }
      },
      {
        name: "username",
        inputType: "text",
        label: "نام کاربری",
        elementProps: {
          defaultValue: data?.username || '',
          disabled: pageType === 'EDIT'
        }
      },
      {
        name: "password",
        inputType: "password",
        label: "رمز عبور",
        // elementProps: {disabled: true}
      },
      {
        name: "secondPassword",
        inputType: "password",
        label: "تکرار رمز عبور",
        // elementProps: {disabled: true}
      },
      {
        name: "email",
        inputType: "text",
        label: "ایمیل",
        elementProps: {
          defaultValue: data?.email || '',
        }
      },
      {
        name: "userEnabled",
        inputType: "select",
        multiple: false,
        label: "وضعیت",
        watch,
        refetch: organizationRefetch,
        options: [
          {
            id: undefined,
            title: 'انتخاب کنید'
          },
          {
            id: true,
            title: 'فعال'
          },
          {
            id: false,
            title: 'غیر فعال'
          },
        ]?.map((state, index) => ({
          title: state.title,
          value: state.id
        })) ?? [],
        renderValue: (selected) => (<Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
          {selected.map((selectedId) => (
            <Chip key={selectedId} label={(data ?? []).find(resource => resource.id === selectedId)?.title}/>
          ))}
        </Box>),
        elementProps: {
          defaultValue: data?.userEnabled || true,
          onChange: (event) => {
            setValue('userEnabled', event.target.value);
          }
        }
      }
    ],
    [data]
  );

  const onSubmitHandler = () => {
    const DTO = getValues();
    DTO.attributes = {org: [selectedOrganizationId]};
    if (pageType === 'EDIT') {
      delete DTO.username;
    }
    mutate({
      method: pageType === 'CREATE' ? 'post' : 'put',
      endpoint: 'http://localhost:8000/api/user',
      data: {
        ...DTO,
        ...(pageType === 'EDIT' ? {id} : {})
      }
    }, {
      onSuccess: (res) => {
        if (res.message !== "ok") {
          snackbar(res.message, "error");
        } else {
          snackbar("عملیات با موفقیت انجام شد", "success");
          navigate('/user/list');
        }
      },
      onError: (res) => snackbar("خطا در انجام عملیات", "error")
    })
  }

  const openOrganizationTreeHandler = () => {
    setOpen(true);
  }

  const closeOrganizationTreeHandler = () => {
    setOpen(false);
  }

  const handleSelectOrganization = (event, organizationId) => {
    setSelectedOrganizationId(organizationId);
  }

  const addToUniqueLinearOrganization = (organization) => {
    if (!organsLinear.find(organ => organ.id === organization.id)) {
      organsLinear.push(organization);
    }
    if (organization.children?.length) {
      organization.children.forEach(organChild => {
        addToUniqueLinearOrganization(organChild);
      })
    }
  }

  useEffect(() => {
    if (organizations?.id) {
      setOrgansLinear(oldOrganizations => {
        addToUniqueLinearOrganization(organizations);
        if (organizations.children?.length) {
          organizations.children.forEach(organization => {
            addToUniqueLinearOrganization(organization);
          })
        }
        return oldOrganizations;
      });
    }
  }, [organizations, setOrgansLinear]);

  useEffect(() => {
    if (pageType === "EDIT") {
      if (data != null && Object.entries(data) != null) {
        Object.entries(data)
          .filter(([key, value]) => key !== 'attributes')
          .forEach(([key, value]) => {
            setValue(key, value);
          })
      }
      if (data?.attributes?.org && organsLinear?.length) {
        handleSelectOrganization(null, organsLinear.find(org => org.id === data.attributes.org));
      }
    }
  }, [pageType, organsLinear, data]);

  const selectedOrganization = useMemo(() => (
    organsLinear.find(organ => organ.id === selectedOrganizationId)
  ), [selectedOrganizationId, organsLinear])

  const OrganizationWidthChildUI = ({
                                      organization
                                    }) => {
    return (<TreeItem key={`organization_${organization.id}`}
                      itemId={organization.id}
                      label={organization.name}>
      {
        organization.children?.length && organization.children.map((childOrg, childIndex) => (
          <OrganizationWidthChildUI key={`organization_child_${childOrg.id}`}
                                    organization={childOrg}/>
        ))
      }
    </TreeItem>)
  }

  return <>
    <div style={{textAlign: "end"}}>
      <button className="btn"
              style={{marginBottom: '12px'}}
              onClick={() => navigate("/user/list")}>بازگشت
      </button>
    </div>
    <Box component='form'
         id="userInfo"
         onSubmitCapture={handleSubmit(onSubmitHandler)}>
      <Grid container spacing={3}>
        {userItems.map((formItem, index) => (
          <Grid item
                md={formItem?.size?.md || 4}
                xs={6}
                key={formItem.name}>
            <Controller
              key={index}
              name={formItem.name}
              control={control}
              render={({field}) => {
                return (<>
                    <Controller
                      name={formItem.name}
                      control={control}
                      render={({field}) => {
                        return <RenderFormInput controllerField={field} errors={errors} {...formItem} {...field} />;
                      }}
                    />
                  </>
                )
              }}
            /></Grid>
        ))}
        <Grid item
              md={4}
              xs={6}>
          <Button color="primary"
                  onClick={openOrganizationTreeHandler}>
            {selectedOrganizationId ? <>تغییر یگان ({selectedOrganization?.name})</> : <>انتخاب یگان</>}
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "end", mt: 4 }}>
        <Button
          type="submit"
          form="userInfo"
          disabled={isLoading}
          variant="contained"
          endIcon={isLoading ? <CircularProgress size={14} /> : <CheckOutlined />}
          color="success"
          sx={{ width: "150px" }}
        >
          ذخیره
        </Button>
      </Box>
    </Box>
    <Grid container>
      <Grid item
            lg={6}
            md={8}>
        <Dialog open={open}
                fullWidth
                onClose={() => setOpen(false)}>
          <DialogTitle>انتخاب یگان</DialogTitle>
          <DialogContent>
            {
              organizations?.id && (
                <SimpleTreeView
                  defaultExpandedItems={[]}
                  checkboxSelection
                  onSelectedItemsChange={handleSelectOrganization}
                  selectedItems={selectedOrganizationId}>
                  <OrganizationWidthChildUI
                    organization={organizations}/>
                </SimpleTreeView>)
            }
            {/*{organizationStatus === "loading" ? (*/}
            {/*  <LinearProgress sx={{ mt: 3 }} />*/}
            {/*) : organizationStatus === "error" ? (*/}
            {/*  <ErrorHandler onRefetch={organizationRefetch()} />*/}
            {/*) : organizationStatus === 'success' ? (*/}
            {/*  <SimpleTreeView checkboxSelection*/}
            {/*                  selectedItems={selectedOrganizations}>*/}
            {/*    <OrganizationWidthChildUI organization={organizations} />*/}
            {/*  </SimpleTreeView>*/}
            {/*) : null*/}
            {/*}*/}
          </DialogContent>
          <DialogActions>
            <Button color="primary"
                    variant="outlined"
                    type="button"
                    onClick={closeOrganizationTreeHandler}>
              ثبت
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  </>
    ;
};

export default UserCrud;
