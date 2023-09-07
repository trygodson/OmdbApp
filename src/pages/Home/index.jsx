import React, { useState, useEffect } from 'react';
import AsyncInput from 'react-select/async-creatable';
import { ImSpinner2 } from 'react-icons/im';
import AuthPagesLayout from '../../layout/AuthPagesLayout';
import { useFormik } from 'formik';
import { GetMovieService, GetSaveSearchService, SaveSearchService } from '../../Services/MovieService';
import * as yup from 'yup';
import ValidationError from '../../components/Error/ValidationError';
import CustomButton from '../../components/Buttons/CustomButton';
import MovieCards from '../../components/MovieCards';
const Loading = () => (
  <div className="flex items-center gap-2 font-medium text-sm mt-2">
    <ImSpinner2 className="animate-spin" />
    <p>Loading...</p>
  </div>
);

const validationSchema = yup.object().shape({
  search: yup.string().required('Type Movie Name'),
  year: yup.string().required('Please Select Your Year'),
  plot: yup.string().required('Plot is Required'),
});

const initialValues = {
  search: '',
  year: '',
  plot: '',
};

function Home() {
  const [selectvalue, setSelectvalue] = useState();
  const [data, setdata] = useState();
  const [loading, setLoading] = useState(false);
  const loadDoctoOptions = async (text, callback) => {
    const res = await GetSaveSearchService({ query: text });
    // const json = res.json();
    callback(
      res.map(({ name }) => ({
        label: name,
        value: name,
      })),
    );
  };
  const customStyles = {
    container: (provided) => ({
      ...provided,
      backgroundColor: '#f3f4f6',
      padding: '4px',
      borderRadius: '5px',
      border: '0px solid transparent',
      outline: 'none',
      color: 'black',
    }),

    valueContainer: (provided) => ({
      ...provided,
      color: 'black',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      backgroundColor: '#f3f4f6',
      color: 'black',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#f3f4f6',
      borderRadius: '10px',
      color: 'black',
    }),

    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#f3f4f6',
      color: 'black',
      border: state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: state.isFocused ? 0 : 0,
      },
    }),
  };

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: validationSchema,
    onSubmit(values) {
      // setLoading(true);

      return GetMovieService({
        ...values,
      })
        .then(async (res) => {
          if (res.response === 'True') {
            const dd = await SaveSearchService({ name: values.search });
            setdata({ ...res, response: true });
            return res;
          } else {
            setdata({ response: false });
            return;
          }
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    },
  });

  const { handleSubmit, getFieldProps, errors, touched, setFieldValue, values, isSubmitting } = formik;

  const onSelectName = (i) => {
    console.log(i, '-----i---');
    setFieldValue('search', i.value);
    // setSelectvalue(i);
  };

  console.log(values.search, '---search----');
  const handleInputChange = (v) => {};
  return (
    <AuthPagesLayout noHeader={loading}>
      {/* main */}
      {loading ? (
        <Loading />
      ) : (
        <div className="!h-screen !w-screen">
          <form className=" w-full " onSubmit={handleSubmit}>
            <div className="grid grid-cols-4  gap-3 w-full px-3">
              <div className="col-span-2">
                <AsyncInput
                  className="reach-doctor-input"
                  styles={customStyles}
                  loadOptions={loadDoctoOptions}
                  isClearable={true}
                  // value={values.search}
                  // inputValue={values.search}
                  onBlur={(event) => event.preventDefault()}
                  placeholder="Search Name of A Movie E.g Moana"
                  // {...getFieldProps('search')}
                  onChange={(val) => onSelectName(val)}
                  // onInputChange={(e) => {
                  //   console.log(e, '---input change--');
                  //   setFieldValue('search', e);
                  //   // setSelectvalue({ value: e });
                  // }}
                />
                {touched.search && touched.search && <ValidationError msg={errors.search} />}
              </div>
              <div className="col-span-1">
                <input
                  value={values.year}
                  autoComplete="off"
                  placeholder={'Year'}
                  type="month"
                  className={`bg-white !h-full !w-full rounded !py-[1px]  text-sm border outline-none focus:border-primary`}
                  {...getFieldProps('year')}
                />
                {touched.year && touched.year && <ValidationError msg={errors.year} />}
              </div>
              <div className="col-span-1">
                <input
                  value={values.plot}
                  placeholder={'Plot E.g full or half'}
                  type="text"
                  className={`bg-white !h-full !w-full rounded  !py-[1px] text-sm border outline-none focus:border-primary`}
                  {...getFieldProps('plot')}
                />
                {touched.plot && touched.plot && <ValidationError msg={errors.plot} />}
              </div>
            </div>
            <div className="w-full px-3 mt-3">
              <CustomButton
                // clickHandler={() => null}
                type={'submit'}
                loading={isSubmitting}
                disabled={isSubmitting}
                className={'w-full  border !px-7  font-semibold !py-3 rounded-md'}
              >
                Search Now
              </CustomButton>
            </div>
          </form>

          <div className="flex flex-row wrap mt-10 px-3">
            {data && data.response ? (
              <MovieCards data={data} />
            ) : (
              <div className="w-full text-center">No Movie Found</div>
            )}
          </div>
        </div>
      )}
    </AuthPagesLayout>
  );
}

export default Home;
