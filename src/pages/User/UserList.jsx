import React, {useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {PAGINATION_DEFAULT_VALUE, paramsSerializer} from "../../@shared/const";
import {useQuery} from "react-query";
import './User.scss';
import {useNavigate} from "react-router-dom";

const UserList = () => {
  const {getApi} = useAuth();
  const [pagination, setPagination] = useState({...PAGINATION_DEFAULT_VALUE});
  const navigate = useNavigate();

  const {data, status, refetch} = useQuery(
    `/api/user${paramsSerializer(pagination)}`,
    getApi,
    {
      enabled: !!pagination,
      select: res => res.data,
      placeholderData: {
        data: {
          rows: [
            {
              id: 1,
              firstName: 'حجت',
              lastName: 'شباب',
              username: 'hojat',
              email: '',
              userEnabled: true,
            }
          ]
        }
      }
    }
  );

  const editUserHandler = (id) => {
    return navigate(`/user/${id}`);
  }

  return <>
    <div style={{textAlign: "end", marginBottom: '12px'}}>
      <button className="btn"
              type="button"
              onClick={() => navigate("/dashboard")}>
        بازگشت
      </button>
      <button className="btn btn-primary"
              type="button"
              style={{marginInlineStart: '10px'}}
              onClick={() => navigate("/user/new")}>
        افزودن
      </button>
    </div>
    <div className='table-responsive'>
      <table className="table">
        <thead>
        <tr>
          <th scope='col'>نام</th>
          <th scope='col'>نام خانوادگی</th>
          <th scope='col'>نام کاربری</th>
          {/*<th scope='col'>ایمیل</th>*/}
          <th scope='col'>وضعیت</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {
          data?.rows?.length ? data?.rows?.map(({
                                                  id,
                                                  firstName,
                                                  lastName,
                                                  username,
                                                  email,
                                                  userEnabled,
                                                }, index) => {
            return (<tr>
              <td>{firstName || '----'}</td>
              <td>{lastName || '----'}</td>
              <td>{username || '----'}</td>
              {/*<td>{email || '----'}</td>*/}
              <td>
                {userEnabled ? (<span className="text-success">
                  فعال
                </span>) : (<span className="text-danger">
                  غیرفعال
                </span>)}
              </td>
              <td width="auto">
                <button className="btn primary"
                        onClick={() => editUserHandler(id)}>
                  ویرایش
                </button>
              </td>
            </tr>)
          }) : (
            <tr>
              <td colSpan='4'>
                یافت نشد
              </td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  </>;
};

export default UserList;
