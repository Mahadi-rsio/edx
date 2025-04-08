import ConfirmationModal from './Modal';

export default function Test() {
    return (
        <ConfirmationModal
            title={'are you sure?'}
            description={'You cannot retrive data if once you delet'}
            onCancel={() => alert('hahah')}
            onConfirm={() => alert('ghsdgah')}
            open={true}
        />
    );
}
