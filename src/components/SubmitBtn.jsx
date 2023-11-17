import { useNavigation } from "react-router-dom"

//Custom submit button
const SubmitBtn = ({ text }) => {
    //navigation declaration to check if form was submitting.
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        // If form was submitting render sending...text and disabled button meanwhile.
        <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>{isSubmitting ? <span className="loading loading-spinner">Sending...</span> : text || 'Submit'}</button>
    )
}

export default SubmitBtn