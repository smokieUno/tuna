using MediatR;

namespace Tuna.Model.EventHandlers.NotificationsHandlers.UserCreatedHandlers;

public class UserAccountCratedNotification : INotification
{
	public Ulid CratedAccountId { get; }

	public UserAccountCratedNotification(Ulid cratedAccountId)
	{
		CratedAccountId = cratedAccountId;
	}
}