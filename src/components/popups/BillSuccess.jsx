import Assets from "../../assets/Assets";

export const BillSuccess = ({ type = '', amount = 5000 }) => {
    return (
        <div className=" w-full m-2">
            <img src={ Assets.successfulSubscription } alt={" Bill success "} />
        </div>
    )
}