import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

const TaskForm = ({ kisiler, submitFn }) => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange', // Trigger validation on change
    defaultValues: {
      title: '',
      description: '',
      people: [],
    },
  });

  const onSubmit = (data) => {
    submitFn({
      ...data,
      id: nanoid(5),
      status: 'yapılacak',
    });
    toast.success('Yeni görev oluşturuldu.');
    // Reset the form
    reset({
      title: '',
      description: '',
      people: [],
    });
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      {/* Title Field */}
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <Controller
          name="title"
          control={control}
          rules={{
            required: 'Task başlığı yazmalısınız',
            minLength: {
              value: 3,
              message: 'Task başlığı en az 3 karakter olmalı',
            },
          }}
          render={({ field }) => (
            <input className="input-text" id="title" type="text" {...field} />
          )}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      {/* Description Field */}
      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <Controller
          name="description"
          control={control}
          rules={{
            required: 'Task açıklaması yazmalısınız',
            minLength: {
              value: 10,
              message: 'Task açıklaması en az 10 karakter olmalı',
            },
          }}
          render={({ field }) => (
            <textarea
              className="input-textarea"
              rows="3"
              id="description"
              {...field}
            ></textarea>
          )}
        />
        <p className="input-error">{errors.description?.message}</p>
      </div>

      {/* People Selection */}
      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <Controller
                name="people"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="checkbox"
                    value={p}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const newPeople = checked
                        ? [...value, p]
                        : value.filter((person) => person !== p);
                      setValue('people', newPeople);

                      // Display error if more than 3 people are selected
                      if (newPeople.length > 3) {
                        toast.error('En fazla 3 kişi seçebilirsiniz');
                      } else if (newPeople.length === 0) {
                        toast.error('Lütfen en az bir kişi seçin');
                      }
                    }}
                    checked={value.includes(p)}
                  />
                )}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>

      {/* Submit Button */}
      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
