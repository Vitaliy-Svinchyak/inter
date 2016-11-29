<?php
declare(strict_types = 1);

namespace app\Essence;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;


/**
 * Class SaveModel
 * The main features are:
 *      2 new modelEvents - validating & validated
 *      Validation logic in model
 * @package App\Essence
 */
class SaveModel extends Model
{
    protected $observables = ['validating', 'validated'];

    protected $validator;

    /**
     * Must return an array of validation rules
     * @return array
     */
    public function rules()
    {
        return [];
    }

    /**
     * Calls validator and returns his result
     * @return bool
     */
    public function validate()
    {
        $validating = $this->fireModelEvent('validating');
        if ($validating === null) {
            return true;
        }
        if ($validating) {
            $rules = $this->rules();
            if ($rules) {
                $this->validator = Validator::make($this->attributes, $rules);
                $result = !$this->validator->fails();
            } else {
                $result = true;
            }

            if ($result) {
                $this->fireModelEvent('validated');
                return true;
            }
        }
        return false;
    }

    /**
     * @return array
     */
    public function getErrors()
    {
        return $this->validator ? $this->validator->errors() : [];
    }

    /**
     * @param array $options
     * @return bool|void
     */
    public function save(array $options = [])
    {
        if ($this->validate()) {
            return parent::save($options);
        }
        return false;
    }
}
