import { Formik, Field, Form } from 'formik';

import { UserViewModel } from '@/portainer/models/user';
import { Icon } from '@/react/components/Icon';
import { TeamViewModel } from '@/portainer/models/team';

import { FormControl } from '@@/form-components/FormControl';
import { Widget, WidgetBody, WidgetTitle } from '@@/Widget';
import { Input } from '@@/form-components/Input';
import { UsersSelector } from '@@/UsersSelector';
import { LoadingButton } from '@@/buttons/LoadingButton';

import { validationSchema } from './CreateTeamForm.validation';

export interface FormValues {
  name: string;
  leaders: number[];
}

interface Props {
  users: UserViewModel[];
  teams: TeamViewModel[];
  onSubmit(values: FormValues): void;
}

export function CreateTeamForm({ users, teams, onSubmit }: Props) {
  const initialValues = {
    name: '',
    leaders: [],
  };

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-xs-12">
        <Widget>
          <WidgetTitle
            icon="plus"
            title="Add a new team"
            featherIcon
            className="vertical-center"
          />
          <WidgetBody>
            <Formik
              initialValues={initialValues}
              validationSchema={() => validationSchema(teams)}
              onSubmit={onSubmit}
              validateOnMount
            >
              {({
                values,
                errors,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                isValid,
              }) => (
                <Form
                  className="form-horizontal"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <FormControl
                    inputId="team_name"
                    label="Name"
                    errors={errors.name}
                    required
                  >
                    <Field
                      as={Input}
                      name="name"
                      id="team_name"
                      required
                      placeholder="e.g. development"
                      data-cy="team-teamNameInput"
                    />
                  </FormControl>

                  {users.length > 0 && (
                    <FormControl
                      inputId="users-input"
                      label="Select team leader(s)"
                      tooltip="You can assign one or more leaders to this team. Team leaders can manage their teams users and resources."
                      errors={errors.leaders}
                    >
                      <UsersSelector
                        value={values.leaders}
                        onChange={(leaders) =>
                          setFieldValue('leaders', leaders)
                        }
                        users={users}
                        dataCy="team-teamLeaderSelect"
                        inputId="users-input"
                        placeholder="Select one or more team leaders"
                      />
                    </FormControl>
                  )}

                  <div className="form-group">
                    <div className="col-sm-12">
                      <LoadingButton
                        disabled={!isValid}
                        data-cy="team-createTeamButton"
                        isLoading={isSubmitting}
                        loadingText="Creating team..."
                      >
                        <Icon icon="plus" feather size="md" />
                        Create team
                      </LoadingButton>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </WidgetBody>
        </Widget>
      </div>
    </div>
  );
}
